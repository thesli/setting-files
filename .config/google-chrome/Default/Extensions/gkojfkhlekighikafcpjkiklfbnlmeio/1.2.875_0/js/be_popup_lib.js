'use strict'; /*jshint browser:true, es5:true*/
define(['underscore', 'etask', 'be_browser', 'be_zerr', 'be_util'],
    function(_, etask, B, zerr, be_util){
B.assert_popup('be_popup_lib');
var chrome = window.chrome;
var conf = chrome ? chrome.extension.getBackgroundPage().conf : window.conf;
var E = {};

/* XXX arik: mv to be_util so we can reuse code with be_lib.js */
E.perr = function(level, opt){
    var S, bg_main, ver;
    var id = opt.id, info = opt.info, bt = opt.bt, filehead = opt.filehead;
    var qs = {ext_ver: be_util.version(), product: be_util.get_product()};
    var ui_popup = window.ui_popup;
    var R = ui_popup && ui_popup.R;
    S = chrome ? chrome.extension.getBackgroundPage().set : null;
    bg_main = window.popup_main ? window.popup_main.be_bg_main : null;
    ver = be_util.version();
    var data = {bt: bt, info: info, filehead: filehead, ver: ver,
	rate_limit: opt.rate_limit};
    if (R)
        qs.rmt_ver = R.get('ver');
    if ((!chrome || conf.new_ui) && bg_main)
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
    if (!qs.uuid)
	qs.uuid = be_util.storage_get('uuid');
    if (!qs.browser)
	qs.browser = be_util.browser();
    qs.id = be_util.perr_id(id);
    zerr._zerr(level, 'perr '+qs.id+(info ? ' info: '+info : '')+
	(bt ? '\n'+bt : ''));
    return etask([function(){ return be_util.perr(data, qs); }]);
};

/* XXX arik: obsolete api, rm */
E.ok = function(id, info){ return E.perr_ok({id: id, info: info}); };
E.perr_ok = function(opt){ return E.perr(zerr.L.NOTICE, opt); };
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
    E.perr(zerr.L.ERR, opt);
};

E.serr = function(with_log){
    return be_util.serr({with_log: with_log,
        rmt: window.ui_popup ? window.ui_popup.R : null,
        bg_main: window.popup_main ? window.popup_main.be_bg_main : null});
};

E.reload_ext = function(opt){
    setTimeout(function(){ E.reload_ext.force(); }, 500);
    E.perr_err({id: 'be_popup_reload_ext', rate_limit: {count: 20},
        info: (window.require_is_remote ? 'r.' : 'l.')+opt.info},
	new Error(''));
};

E.reload_ext.force = function(){
    try { zerr.notice('going for full reload'); } catch(err){}
    B.be.reload_ext();
};

E.set_TypeError_handler = function(){
    etask.on_TypeError = function(err){
        if (err.sent_perr)
            return;
        err.sent_perr = true;
        E.err('be_etask_typeerror', null, err);
    };
};

return E; });
