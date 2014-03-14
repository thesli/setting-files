'use strict'; /*jshint browser:true, es5:true*/
define(['underscore', 'etask', 'be_browser', 'be_zerr', 'be_util', 'escape'],
    function(_, etask, B, zerr, be_util, zescape){
B.assert_bg('be_lib');
var chrome = window.chrome, conf = window.conf;
var E = {};

function storage_err(name, items, err)
{
    var msg = name+' '+zerr.json(items)+' failed '+(err && err.message);
    zerr(msg);
    throw new Error(msg);
}

/* XXX arik: cleanup code, need an easy way to wrap chrome api with when
 * (similar to nodefn) */
E.storage_local_get = function(items){
    return etask([function(){
	B.storage.local.get(items, this.econtinue_fn());
	return this.wait();
    }, function(items){
	var e = B.runtime.last_error;
	if (e || !items)
            storage_err('storage_local_get', items, e);
	return items;
    }]);
};

E.storage_local_set = function(items){
    return etask([function(){
	B.storage.local.set(items, this.econtinue_fn());
	return this.wait();
    }, function(){
	var e = B.runtime.last_error;
	if (e)
            storage_err('storage_local_set', items, e);
	return items;
    }]);
};

E.storage_sync_get = function(items){
    return etask([function(){
	B.storage.sync.get(items, this.econtinue_fn());
	return this.wait();
    }, function(items){
	var e = B.runtime.last_error;
	if (e || !items)
            storage_err('storage_sync_get', items, e);
	return items;
    }]);
};

E.storage_sync_set = function(items){
    return etask([function(){
	B.storage.sync.set(items, this.econtinue_fn());
	return this.wait();
    }, function(){
	var e = B.runtime.last_error;
	if (e)
            storage_err('storage_sync_set', items, e);
	return items;
    }]);
};

E.reload_ext = function(opt){
    zerr.notice('reload_ext '+zerr.json(opt));
    if (opt && opt.force)
	return E.reload_ext.force();
    return etask([function(){
	/* XXX arik: use localStorage */
	return E.storage_local_get('reload');
    }, function(items){
	var info = items.reload||{};
	info.reload_ext = info.reload_ext||{};
	var ts = info.reload_ext.ts ? new Date(info.reload_ext.ts) :
	    new Date();
	var count = info.reload_ext.count||0;
	var diff = new Date() - ts;
	if (diff>60000 || diff<0)
	{
	    ts = new Date();
	    count = 1;
	}
	else if (count<2)
	    count++;
	else
	{
	    zerr('too many reload_ext '+count);
	    throw new Error('too many reload_ext '+count);
	}
        info.reload_ext.ts = ''+ts; /* cannot save objects to storage */
        info.reload_ext.count = count;
	return E.storage_local_set({'reload': info});
    }, function(){
	return E.reload_ext.force();
    }]);
};

E.reload_ext.force = function(){
    try { zerr.notice('going for full reload'); } catch (err){}
    B.be.reload_ext();
};

E.get_flags = function(){
    var bg_main = window.be_bg_main;
    if (bg_main && bg_main.get_flags)
	return bg_main.get_flags();
    if (window.util && window.util.get_flags)
	return window.util.get_flags();
    return 0;
};

E.perr = function(level, opt){
    var RMT, S, bg_main, ver, data;
    var id = opt.id, info = opt.info, bt = opt.bt, filehead = opt.filehead;
    var skip_ver_check = opt.skip_ver_check, flags = E.get_flags();
    var qs = {ext_ver: be_util.version(), product: be_util.get_product()};
    RMT = window.RMT;
    S = window.set;
    bg_main = window.be_bg_main;
    ver = be_util.version();
    data = {bt: bt, info: info, filehead: filehead, ver: ver, flags: flags,
	rate_limit: opt.rate_limit};
    if (RMT)
	qs = RMT.auth();
    else if (bg_main)
    {
	qs.uuid = bg_main.get('uuid');
	qs.cid = bg_main.get('cid');
	qs.browser = bg_main.get('browser');
	qs.session_key = bg_main.get('session_key');
    }
    else if (S) /* XXX arik BACKWARD */
    {
        qs.uuid = S('uuid');
        qs.cid = S('cid');
	qs.browser = S('browser');
	qs.session_key = S('session_key');
    }
    else
	zerr('cannot get information for perr %s %s', id, info);
    qs.id = be_util.perr_id(id);
    zerr._zerr(level, 'perr '+qs.id+(info ? ' info: '+info : '')+
	(bt ? '\n'+bt : ''));
    return etask([function(){ return be_util.perr(data, qs); }]);
};

/* XXX arik: obsolete api, rm */
E.ok = function(id, info){ return E.perr_ok({id: id, info: info}); };
E.perr_ok = function(opt){ return E.perr(zerr.L.NOTICE, opt); };
E.stats = function(id, info){ return E.perr(zerr.L.NOTICE,
    {id: id, info: info, rate_limit: {count: 20}}); };
/* XXX arik: obsolete api, rm */
E.err = function(id, info, err){
    return E.perr_err({id: id, info: info}, err); };
E.perr_err = function(opt, err){
    if ((err&&err.message)=='load_new_ver')
	return zerr.notice('drop perr %s %s', opt.id, opt.info);
    var err_msg = !err ? '' : typeof err == 'string' ? err :
        err.message||'';
    opt.info = !opt.info ? err_msg : opt.info+' '+err_msg;
    opt.bt = err ? err.stack : opt.bt;
    opt.filehead = opt.filehead;
    return E.perr(zerr.L.ERR, opt);
};

E.serr = function(with_log){
    return be_util.serr({with_log: with_log, rmt: window.RMT,
	bg_main: window.be_bg_main, be_local: window.be_local});
};

/* XXX arik: rename to open_my_settings and mv to be_util */
E.open_ccgi = function(opt){
    /* XXX arik/mark: check encoding of hash */
    var url = opt.ccgi_url+(opt.host ? '&'+zescape.to_uri({url: opt.host}) :
	'')+(opt.hash ? '#'+opt.hash : '');
    return be_util.open_hola_tab({url: url});
};

E.check_svc = function(){
    if (window.be_bg_main)
        return window.be_bg_main.check_svc();
    if (window.set)
        window.set.notify('check_svc');
    zerr('check_svc unreachable line');
};

return E; });
