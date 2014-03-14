// Copyright: Mingyi Liu (http://mingyi.org), 2010-3.
DCCT_Setting = {
  save: function(obj)
  {
    this.storeVal('setting', obj);
  },
  load: function()
  {
    return this.loadVal('setting');
  },
  init: function()
  {
    var o = { totalTime: 1000, useDblClick: true, useDblRightClick: false, reopenKey: 'shiftKey',
              noIcon: false, noWhatsNew: false, revertClick: false,
              lastTabApp: false, iconDupTab: false };
    if(localStorage.setting)
    {
      var t = this.loadVal('setting');
      for(var i in t) o[i] = t[i];
    }
    this.save(o);
    return o;
  },
  loadVal: function(key)
  {
    return JSON.parse(localStorage[key] || '[]');
  },
  storeVal: function(key, val)
  {
    localStorage[key] = JSON.stringify(val);
  }
};
