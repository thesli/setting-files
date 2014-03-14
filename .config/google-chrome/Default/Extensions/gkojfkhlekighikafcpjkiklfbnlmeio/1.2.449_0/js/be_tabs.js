'use strict'; /*jshint browser:true, es5:true*/
/* XXX arik/mark: review together backbone usage */
define(['jquery', 'underscore', 'etask', 'be_backbone', 'be_browser',
    'string'], function($, _, etask, be_backbone, B, string){
B.assert_bg('be_tabs');
var conf = window.conf, chrome = window.chrome;
var E = new (be_backbone.model.extend({
    _defaults: function(){ this.on('destroy', function(){ E.uninit(); }); },
}))();

function active_cb()
{
    etask([function(){ return E.get_tab(E.get('active.real.id'));
    }, function(tab){
	if (tab && chrome)
	{
	    /* don't change tab if new tab is developer tools */
	    if (string.startsWith(tab.url||'',
		'chrome-devtools://devtools/bundled/devtools.html'))
	    {
		return;
	    }
	}
	E.set('active.id', tab ? tab.id : undefined);
	E.set('active.url', tab ? tab.url : '');
    }, function catch$(err){ E.set_err('be_tabs_active_cb_err', err); }]);
}

function on_created(tab)
{
    if (tab.url && tab.url.match(conf.ccgi_re))
	E.set('ccgi', tab.id);
    E.trigger('created', {tab: tab});
}

function on_updated(id, info, tab)
{
    if (!info.url)
	return;
    if (info.url.match(conf.ccgi_re))
	E.set('ccgi', tab.id);
    else if (tab.id==E.get('ccgi'))
	E.set('ccgi', null);
    E.trigger('updated', {id: id, info: info, tab: tab});
}

function on_activated(info)
{
    E.set('active.real.id', info.tabId);
}

function on_removed(id, info)
{
    if (id===E.get('ccgi'))
	E.set('ccgi', null);
    E.trigger('removed', {id: id, info: info});
}

function on_replaced(added, removed)
{
    if (removed===E.get('ccgi'))
	E.set('ccgi', null);
    E.trigger('replaced', {added: added, removed: removed});
}

function on_focused(id)
{
    B.tabs.query({active: true, windowId: id}, function(tabs){
	E.set('active.real.id', tabs.length ? tabs[0].id : 0); });
}

E.init = function(){
    if (E.inited)
        return;
    B.windows.get_last_focused({}, function(win){
        B.tabs.query({active: true, windowId: win.id}, function(t){
            E.set('active.real.id', t.length ? t[0].id : 0);
            E.set('active.url', t.length ? t[0].url : '');
        });
        B.tabs.query(chrome ? {url: conf.ccgi_match} :
            {url_re: conf.ccgi_re},
            function(t){ E.set('ccgi', t.length ? t[0].id : 0); });
    });
    B.tabs.on_created.add_listener(on_created);
    B.tabs.on_updated.add_listener(on_updated);
    B.tabs.on_activated.add_listener(on_activated);
    B.tabs.on_removed.add_listener(on_removed);
    B.tabs.on_replaced.add_listener(on_replaced);
    B.windows.on_focus_changed.add_listener(on_focused);
    E.on_init('change:active.real.id updated replaced', active_cb);
    B.backbone.server.start(E, (B.is_rmt ? 'r.' : '')+'be_tabs');
    E.inited = true;
};

E.uninit = function(){
    if (!E.inited)
        return;
    B.backbone.server.stop((B.is_rmt ? 'r.' : '')+'be_tabs');
    B.tabs.on_created.del_listener(on_created);
    B.tabs.on_updated.del_listener(on_updated);
    B.tabs.on_activated.del_listener(on_activated);
    B.tabs.on_removed.del_listener(on_removed);
    B.tabs.on_replaced.del_listener(on_replaced);
    B.windows.on_focus_changed.del_listener(on_focused);
    E.inited = false;
};

E.get_tab = function(tab_id){
    if (!tab_id)
	return null;
    return etask([function(){
	B.tabs.get(tab_id, this.econtinue_fn());
	return this.wait();
    }, function(tab){ return tab; }]);
};

E.active = function(){ return E.get_tab(E.get('active.id')); };

E.get_ccgi = function(){
    return etask([function(){ return E.get_tab(E.get('ccgi'));
    }, function(tab){
        if (!tab || !tab.url && !tab.url.match(conf.ccgi_re))
	    return null;
    }]);
};
return E; });
