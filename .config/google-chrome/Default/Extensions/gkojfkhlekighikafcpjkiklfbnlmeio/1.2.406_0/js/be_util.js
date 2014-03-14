'use strict'; /*jshint browser:true, es5:true*/
define(['jquery', 'be_backbone', 'underscore', 'be_zerr', 'svc_util', 'etask',
    'rate_limit', 'date', 'escape', 'be_browser',],
    function($, be_backbone, _, zerr, zutil, etask, rate_limit, date, zescape,
    B){
var chrome = window.chrome;
var BG = chrome ? chrome.extension.getBackgroundPage() : window;
/* XXX bahaa/arik BACKWARD: organize */
var conf = BG.conf, zconf = BG.zon_config||BG;
var E = new be_backbone.model();

E.json_opt = function(opt){
    var timeout = opt.timeout||20*date.ms.SEC, slow = opt.slow||2*date.ms.SEC;
    var retry = opt.retry, data = opt.data, qs = zescape.to_uri(opt.qs);
    var url = opt.url+(qs ? '?'+qs : ''), perr= opt.perr;
    var type = opt.type||'POST';
    var t0 = Date.now();
    zerr.debug('json url '+url+' retry '+retry);
    return etask([function(){
	$.ajax({dataType: 'json', type: type, url: url, data: data,
	    timeout: timeout, success: this.econtinue_fn(),
	    error: function(xhr, textStatus, errorThrown){
		this.egoto('err', [textStatus, errorThrown]); }.bind(this)});
	return this.wait();
    }, function(data){
	var t = Date.now()-t0;
	zerr[t>slow ? 'err' : 'debug'](
	    'json '+(t>slow ? 'SLOW ' : 'ok ')+t+'ms url '+url);
	if (t>slow && perr)
	    perr({id: 'be_json_slow', info: t+'ms '+url});
	E.do_op(data&&data.do_op);
	return this.ereturn(data);
    }, function err(res){
	var textStatus = res[0], errorThrown = res[1];
	zerr('json failed url '+url+' data '+
	    zerr.json(data).substr(0, 200)+' textStatus: '+textStatus+
	    ' errorThrown: '+errorThrown);
	if (retry)
	{
	    var _opt = _.clone(opt);
	    _opt.retry = retry-1;
	    return E.json_opt(_opt);
	}
	if (errorThrown=='timeout')
	    E.storage_set("ajax_timeout", E.storage_get_int('ajax_timeout')+1);
	throw new Error(errorThrown);
    }]);
};

E.json = function(timeout, url, data, retry){
    return E.json_opt({timeout: timeout, url: url, data: data, retry: retry});
};

E.ajax_opt = function(opt){
    var timeout = opt.timeout||20*date.ms.SEC, slow = opt.slow||2*date.ms.SEC;
    var retry = opt.retry, url = opt.url, data = opt.data;
    var t0 = Date.now();
    zerr.debug('ajax url '+url+' retry '+retry);
    return etask([function(){
	var _this = this;
	$.ajax({dataType: 'text', type: 'POST', url: url, data: data,
	    timeout: timeout, success: this.econtinue_fn(),
	    error: function(xhr, textStatus, errorThrown){
		_this.egoto('err', [textStatus, errorThrown]); }
	});
	return this.wait();
    }, function(res){
	var retval = +res.split(' ')[0], _res = res.substr(res.indexOf(' ')+1);
	if ((isNaN(retval) || retval))
	{
	    zerr('ajax failed retval '+retval+' url: '+url
		+' data: '+zerr.json(data).substr(0, 200)+' res: '+res);
	    throw new Error('ajax onfail');
	}
	var t = Date.now()-t0;
	zerr[t>slow ? 'err' : 'debug'](
	    'ajax '+(t>slow ? 'SLOW ' : 'ok ')+t+'ms url '+url);
        return this.ereturn({'res': _res});
    }, function err(res){
	var textStatus = res[0], errorThrown = res[1];
	zerr('ajax failed url '+url+' data '+zerr.json(data)
	    +' textStatus '+textStatus+' errorThrown '+errorThrown);
	if (retry)
	{
	    var _opt = _.clone(opt);
	    _opt.retry = retry-1;
	    return E.ajax_opt(_opt);
	}
	if (errorThrown=='timeout')
	    E.storage_set("ajax_timeout", E.storage_get_int('ajax_timeout')+1);
	throw new Error(errorThrown);
    }]);
};

E.ajax = function(timeout, url, data, retry){
    return E.ajax_opt({timeout: timeout, url: url, data: data, retry: retry});
};

E.dump_obj = function(obj, fields){
    return !obj ? '' :
        zerr.json(obj, fields, ' ').replace(/^[{ }]\n?|,$/gm, '');
};

E.os_mac = function(){
    return !!navigator.userAgent.match(/[\( ]Macintosh[\);]/); };

E.os_win = function(){
    return !!navigator.userAgent.match(/[\( ]Windows(| NT \d.\d)[\);]/); };

E.os_win_xp = function(){
    return !!navigator.userAgent.match(/[\( ]Windows(| NT 5.1)[\);]/); };

E.os_win8 = function(){
    return !!navigator.userAgent.match(/[\( ]Windows(| NT 6.2)[\);]/); };

/* check win8 and fulscreen, more reliable when called from popup */
E.is_metro_guess = function(){
    return etask([function(){
        if (!chrome || !E.os_win8())
            return false;
        chrome.windows.getAll({}, function(wins){
            var l = wins ? wins.length : 0;
            for (var i=0; i<l; i++)
            {
		var win = wins[i], screen = window.screen;
                /* win.state==='fullscreen' is false for metro */
                if (win.width!==screen.width || win.height!==screen.height)
                    return this.ereturn(false);
            }
            this.ereturn(l>0);
        }.bind(this));
        return this.wait();
    }]);
};

E.version = function(){ return zconf.ZON_VERSION; };

E.unsupported_browser = function(){
    if (chrome)
        return zutil.version_cmp($.browser.version, '22.0.1229.79')<0;
    return false;
};

E.svc_callback = function(opt){
    opt = opt||{};
    var ajopt = {dataType: 'json', cache: false, timeout: opt.timeout||5000};
    var _this, old = false;
    return etask([function(){
	_this = this;
	$.ajax($.extend({}, ajopt, {url: conf.ipc+'callback.json',
            error: function(xhr, status){
                _this.econtinue([xhr, status]); },
	    success: function(data, status){
                _this.egoto('success', [data, status]); }
	}));
	return this.wait();
    }, function(r){
        var xhr = r[0];
        if (opt.ignore_old || xhr.status!=404)
	    throw new Error('not running');
        old = true;
        /* something responded with 404, try old callback for v<1.0.187 */
        $.ajax($.extend({}, ajopt, {url: conf.ipc+'callback.cgi?cid',
            success: function(data, status){
                _this.econtinue([data, status]); },
            error: function(){ _this.ethrow('not running'); }
	}));
	return this.wait();
    }, function success(r){
        var data = r[0], status = r[1];
        if (status!=='success' ||
            (old ? data<=0 : typeof data.cid!=='number'))
        {
            throw new Error('not running');
        }
        if (opt.raw)
            return this.ereturn(data);
        if (old)
            return this.ereturn({svc: {version: '0.0.0', cid: +data}});
        var is_svc = data.exe!==zconf.PLUGIN_EXE;
        /* if a plugin is running under different user or browser,
         * we ignore it */
	if (!E.is_plugin() && !is_svc)
	    throw new Error('unrelated plugin running');
        var ret = {status: {}};
        if (data.ws_port>0)
            ret.ws_port = data.ws_port;
        if (data.cgi_link)
        {
            ret.ccgi_url_base = data.cgi_link.replace(
                chrome ? 'http://' : 'https://',
                chrome ? 'https://' : 'http://');
        }
        if (data.hasOwnProperty('has_internet'))
            ret.status.has_internet = data.has_internet;
        if (data.protocol)
        {
            ret.status.protocol = {enabled: !data.protocol.disable,
                connected: !!data.protocol.connected};
        }
        if (data.unblocker)
        {
            ret.status.unblocker = {enabled: !data.unblocker.disable,
                connected: !!data.unblocker.connected,
                pac_url: data.unblocker.pac_url};
        }
        ret.cid = data.cid;
        ret[is_svc ? 'svc' : 'plugin'] = {cid: data.cid,
            version: data.ver||'0.0.0'};
        /* svc returns this string when there's no session_key,
         * consider it null */
        ret.session_key =
            data.session_key==='00000000000000000000000000000000' ? null :
            data.session_key;
        return this.ereturn(ret);
    }]);
};

function padhex(num){ return ('000000000'+num.toString(16)).substr(-8); }

E.ipc_cmd = function(port, cmd, opt){
    if (!(this instanceof E.ipc_cmd))
        return new E.ipc_cmd(port, cmd, opt);
    opt = this.opt = opt||{};
    this.timer = null;
    this.n = 0;
    var q = this.q = [];
    var ws = this.ws = new WebSocket('ws://127.0.0.1:'+port+'/');
    var _this = this;
    ws.onopen = function(){
        var argv = cmd.split(' ');
        var msg = padhex(4)+' '+padhex(argv.length);
        for (var i=0; i<argv.length; i++)
            msg += ' '+padhex(argv[i].length)+' '+argv[i];
        ws.send(msg);
    };
    ws.onmessage = function(e){
        this.n++;
        zerr.debug('ipc %s', e.data);
        var argv = e.data.split(' '), ret = parseInt(argv[1], 16);
        q.push({ret: ret, data: argv});
        if (opt.qlen && q.length>opt.qlen)
            q.shift();
        _this._notify();
    };
    ws.onclose = function(e){
        zerr.debug('ipc closed code: %d reason: %s clean: %s', e.code,
            e.reason, e.wasClean);
        _this.closed = true;
        _this._notify(new Error('connection closed'));
    };
    ws.onerror = function(e){
        zerr.debug('ipc error %O', e);
        _this.closed = true;
        _this._notify(e);
    };
};

E.ipc_cmd.prototype.recv = function(timeout){
    var _this = this;
    var e = etask('recv', [function(){
	_this.d = this;
	return this.wait();
    }]);
    if (this.q.length)
        this._notify();
    else if (this.closed)
        this._notify(new Error('connection closed'));
    else if (timeout)
        this.timer = setTimeout(this._notify.bind(this, 'timeout'), timeout);
    return e;
};

E.ipc_cmd.prototype._notify = function(err){
    var d = this.d;
    if (!d)
        return;
    if (err==='timeout')
        d.econtinue(null);
    else if (err)
        d.ethrow(err);
    else
        d.econtinue(this.q.shift());
    this._clear_timer();
    delete this.d;
};

E.ipc_cmd.prototype._clear_timer = function(){
    clearTimeout(this.timer);
    this.timer = null;
};

E.ipc_cmd.prototype.destroy = function(){
    try { this.ws.close(); }
    catch (err){ zerr(err); }
    this._clear_timer();
    delete this.q;
    delete this.d;
};

E.serr = function(opt){
    var s = '', with_log = opt.with_log;
    var rmt = opt.rmt, bg_main = window.be_bg_main, be_local = window.be_local;
    var ccgi_ver, be_ext;
    /* XXX arik/bahaa: need just to send one log (local for local perrs
     * and remote for remote perrs) */
    var log1, log2='', log2_hdr, log_sect_sz = (opt.log_sz||4096)/2 | 0;
    try {
	if (rmt)
	{
	    ccgi_ver = rmt.get('ver');
	    be_ext = rmt.be_ext;
	}
	s += E.dump_obj({url: location.href, date: Date(),
	    ccgi_ver: ccgi_ver});
	s += E.dump_obj(navigator, ['userAgent', 'platform', 'product',
	    'productSub', 'buildID', 'vendor']);
	if (be_ext && be_ext.local.set && be_ext.local.set &&
	    be_ext.local.set.get_internals)
	{
	    s += '\nset:\n'+
		E.dump_obj(be_ext.local.set.get_internals().set);
	}
	if (bg_main)
	    s += '\nbg_main:\n'+E.dump_obj(bg_main.attributes);
	if (be_ext)
	    s += '\nbe_ext:\n'+E.dump_obj(be_ext.attributes);
	if (with_log)
	{
	    log1 = zerr.log.join('\n')+'\n';
	    if (bg_main && bg_main.zerr && bg_main.zerr.log)
            {
                log2_hdr = 'bg_main:\n';
		log2 = bg_main.zerr.log.join('\n')+'\n';
            }
	    /* XXX arik BACKWARD: version prior to 1.1.507 used be_util.zerr */
	    if (be_local && be_local.be_util && be_local.be_util.log)
            {
                log2_hdr = 'local:\n';
		log2 = '\nlocal:\n'+be_local.be_util.log.join('\n')+'\n';
            }
	    /* XXX arik hack: unite the two logs together in a better way
	     * (overload console/use same log buffer) */
	    if (be_local && be_local.zerr && be_local.zerr.log)
            {
                log2_hdr = 'local:\n';
		log2 = '\nlocal:\n'+be_local.zerr.log.join('\n')+'\n';
            }
            s += '\nlog:\n'+log1.substr(-log_sect_sz)+'\n'+log2_hdr
            +log2.substr(-log_sect_sz);
	}
    } catch (e){ s = 'Error in serr: '+(e.stack||e)+'\n'+s; }
    return s;
};

/* XXX arik: sync be_base.js <-> be_util.js (need to rm code duplication) */
E.browser = function(){ return conf.browser.firefox ? 'firefox' :
    conf.browser.torch ? 'torch' : 'chrome'; };

function storage_err(api, key, err)
{
    zerr('%s failed %s %s %s',api, key, ''+err, err.stack);
    E.set('storage.err', (E.get('storage.err')||0)+1);
}

E.storage_set = function(key, val){
    try { localStorage[key] = val; }
    catch (err){ storage_err('storage_set', key, err); }
};
E.storage_get = function(key){
    try { return localStorage[key]; }
    catch (err){ storage_err('storage_get', key, err); }
};
E.storage_get_int = function(key){ return +E.storage_get(key)||0; };
E.storage_clr = function(key){
    try { localStorage.removeItem(key); }
    catch (err){ storage_err('storage_clr', key, err); }
};
E.storage_set_json = function(key, val){
    return E.storage_set(key, JSON.stringify(val)); };
E.storage_get_json = function(key){
    var val = E.storage_get(key);
    if (!val)
	return val;
    return JSON.parse(val);
};

E.is_plugin = (function(){
    if (chrome && !conf.new_ui)
	return function(){ return BG.util.is_plugin(); };
    /* XXX arik BACKWARD: www version 1.1.641 was overitten with a plugin
     * version and distributed to customers */
    if (zutil.version_cmp(E.version(), '1.1.641')<=0)
	return function(){ return 0; };
    var is_plugin = !E.storage_get('tmp_not_plugin') &&
	zconf.BEXT_PLUGIN && E.os_win() &&
        (E.storage_get_int('plugin_enabled') || conf.plugin_enabled);
    return function(){ return is_plugin; };
})();

E.ext_type = (function(){
    var types = _.invert(conf.ids);
    return function(id){ return types[id]; };
})();

/* XXX arik: sync be_base.js <-> be_util.js (need to rm code duplication) */
E.build_info = function(){
    var rmt, ext;
    if (window.RMT)
	rmt = window.RMT;
    else if (window.ui_popup)
	rmt = window.ui_popup.R;
    ext = rmt && rmt.be_ext;
    var info = {version: zconf.ZON_VERSION};
    if (rmt)
    {
	info.server_version = rmt.get('ver')+
	    (!rmt.get('inited') ? ' Not initialized' : '');
    }
    if (ext)
    {
	if (ext.get('svc.running'))
	    info.svc_version = ext.get('svc.version');
    }
    info.makeflags = zconf.CONFIG_MAKEFLAGS;
    if (chrome)
	info.product_type = conf.type;
    info.id = chrome ? chrome.runtime&&chrome.runtime.id :
        'jid1-4P0kohSJxU1qGg@jetpack';
    info.browser = E.browser()+' '+$.browser.version;
    info.platform = navigator.platform;
    info.user_agent = navigator.userAgent;
    return info;
};

E.do_op = function(o){
    if (!o || !o.op)
	return;
    var ver = o.ver, op = o.op;
    switch (op)
    {
    case 'reload_rmt': do_op_reload_rmt(o); break;
    case 'reload_ext': do_op_reload_ext(o); break;
    case 'upgrade_ext': do_op_upgrde_ext(o); break;
    case 'disable_plugin_once': do_op_disable_plugin_once(o); break;
    default:
	zerr('unknown op '+zerr.JSON(o));
    }
};

function do_op_reload_rmt(o)
{
    zerr.notice('do_op_reload_rmt '+zerr.json(o));
    if (window.RMT)
	window.RMT.load_new_ver(o.ver);
    else if (window.ui_popup && window.ui_popup.R)
	window.ui_popup.R.fcall('load_new_ver', [o.ver]);
    else
	do_op_reload_ext(o);
}

function do_op_reload_ext(o)
{
    zerr.notice('do_op_reload_ext '+zerr.json(o));
    B.be.reload_ext();
}

function do_op_upgrde_ext(o)
{
    zerr.notice('do_op_upgrde_ext '+zerr.json(o));
    B.runtime.request_update_check(function(status){
	zerr.notice('update check: '+status); });
}

function do_op_disable_plugin_once(o)
{
    if (!E.is_plugin())
	return;
    zerr.notice('do_op_disable_plugin_once '+zerr.json(o));
    E.storage_set('set_tmp_not_plugin', 1);
    setTimeout(function(){ B.be.reload_ext(); });
}

/* XXX arik: sync be_base.js <-> be_util.js (need to rm code duplication) */
E.build = function(){
    var info = E.build_info(), s = '';
    for (var f in info)
	s += (s&&'\n')+f+': '+info[f];
    return s;
};

E.perr = function(opt, qs){
    opt = _.clone(opt);
    var id = opt.id||qs.id;
    var ms = (opt.rate_limit && opt.rate_limit.ms)||date.ms.HOUR;
    var count = (opt.rate_limit && opt.rate_limit.count)||10;
    var rl_hash = E.perr.rl_hash = E.perr.rl_hash||{};
    var rl = rl_hash[id] = rl_hash[id]||{};
    opt.build = opt.build||E.build();
    opt.is_json = 1;
    if (rate_limit(rl, ms, count))
	return E.json_opt({url: conf.url_ccgi+'/perr', qs: qs, data: opt});
    if (id=='be_perr_rate_limit')
	return;
    zerr('perr %s %s rate too high %s %d %d', id, opt.info, zerr.json(rl),
        ms, count);
    return E.perr({rate_limit: {ms: date.ms.HOUR, count: 1},
	id: 'be_perr_rate_limit', info: JSON.stringify({id: id,
	info: opt.info}), browser: opt.browser, ver: opt.ver, uuid: opt.uuid,
	cid: opt.cid, bt: opt.bt});
};

/* XXX arik: organize all perrs */
E.perr_id = function(id){
    if (!id.match(/^be_/))
	id = 'be_'+(E.is_plugin() ? 'plugin_' : '')+id;
    else if (E.is_plugin() && !id.match(/^be_plugin_/))
	id = id.replace('be_', 'be_plugin_');
    return id;
};

E.init = function(){
    if (E.storage_get_int('use_http'))
	conf.url_ccgi = conf.url_ccgi.replace('https://', 'http://');
};

E.svc_version_check = function(version, be_ext)
{
    var ver;
    if (E.is_plugin())
	ver = E.version();
    else if (be_ext.get('svc.running'))
	ver = be_ext.get('svc.version');
    else
	return false;
    return zutil.version_cmp(ver, version)>=0;
};

E.open_tab = function(opt){
    function create_tab(url){ B.tabs.create({url: url}); }
    var url = opt.url;
    /* XXX arik: wrap with etask */
    B.tabs.query(_.extend({lastFocusedWindow: true}, opt.tab_match),
	function(tabs){
	if (!tabs || !tabs.length)
	    return create_tab(url);
	B.tabs.update(tabs[0].id, {url: url, active: true},
	    function(tab){
	    if (!tab)
		create_tab(url);
	});
    });
};

E.open_hola_tab = function(opt){
    var _opt = _.clone(opt);
    _opt.tab_match = chrome ? {url: '*://hola.org/*'} :
	{url_re: '^https?://hola\\.org/*$'};
    return E.open_tab(_opt);
};

E.get_product = function(){ return conf.type; };

E.get_proto = function(){
    return E.storage_get_int('use_http') ? 'http' : 'https'; };

E.init();
return E; });
