// Copyright: Mingyi Liu (http://mingyi.org), 2010-3
DCCT_MouseHandler = {
  numOfClicks: 0,
  totalTime: null,
  totalRightTime: 300,
  useDblClick: true,
  useDblRightClick: false,
  reopenKey: 'shiftKey',
  revertClick: false,
  //QC on clicks
  clickIntervals: [],
  lastClickTime: null,

  clear: function(c)
  {
    if(c == null || this.numOfClicks == c)
    {
      this.numOfClicks = 0;
      this.clickIntervals = [];
    }
  },
  setClick: function(e)
  {
    if(this.revertClick)
    {
      var el = DCCT_Util.hasLink(e.target);
      if(el)
      {
        DCCT_Util.stopEvent(e);
        if(e.ctrlKey || e.metaKey) DCCT_Util.request('linkcurrent', el.href);
        else if(!e.altKey && !e.shiftKey) DCCT_Util.request('linknewback', el.href);
      }
    }
    if(this.useDblClick) return;
    if(!this.numOfClicks) this.lastClickTime = new Date();
    else
    {
      var t = new Date();
      if(this.clickIntervals.length > 1) this.clickIntervals.shift();
      this.clickIntervals.push(t - this.lastClickTime);
      this.lastClickTime = t;
    }
    if(this.useDblRightClick && e.which == 3 && ++this.numOfClicks >= 2 && this.totalRightTime >= this.clickIntervals[this.clickIntervals.length - 1])
    {
      this.clear();
      this.doDblClick(e, true);
    }
    else if(!this.useDblRightClick && e.which == 1 && ++this.numOfClicks >= 3)
    {
      var t1 = this.clickIntervals[0], t2 = this.clickIntervals[1];
      var t = t1 / t2, f = 2; // f QC the clicks
      if(t1 + t2 <= this.totalTime && t <= f && t >= 1/f)
      {
        this.clear();
        this.doDblClick(e, true);
      }
    }
    setTimeout(function() {
      DCCT_MouseHandler.clear(DCCT_MouseHandler.numOfClicks)
    }, this.useDblRightClick? this.totalRightTime : this.totalTime);
  },
  doDblClick: function(e, force)
  {
    if(!this.useDblClick && !force) return;
    var t = e.target;
    if(t.tagName.match(/INPUT|SELECT/) && t.type.match(/text|file|check|select/i)) return;
    if(e[this.reopenKey])
      DCCT_Util.request('reopenTab');
    else if(force || !DCCT_Util.hasTextSelection(e, true))
      DCCT_Util.request('closeTab');
  },
  removeListeners: function()
  {
    if(this.c) document.removeEventListener(this.c.e, this.c.f, this.c.c);
    if(this.dc) document.removeEventListener(this.dc.e, this.dc.f, this.dc.c);
  },
  init: function()
  {
    DCCT_Util.initVal();
    this.c = DCCT_Util.addEventListener('mouseup', this.setClick, false, this);
    this.dc = DCCT_Util.addEventListener('dblclick', this.doDblClick, false, this);
  }
};
DCCT_Util = {
  initVal: function()
  {
    chrome.extension.sendMessage({action:'getOptions'}, function(r) {
      DCCT_Util.copy(DCCT_MouseHandler, r);
    });
  },
  copy: function(o, src, keys)
  {
    if(keys && keys.length)
    {
      for(var i = 0; i < keys.length; i++)
        o[keys[i]] = src[keys[i]];
    }
    else
    {
      for(var i in src)
        o[i] = src[i];
    }
    return o;
  },
  request: function(r, o)
  {
    chrome.extension.sendMessage({action:r,option:o});
  },
  addEventListener: function(e, f, c, o)
  {
    var t = {e:e, f:o? function() { f.apply(o, arguments) } : f, c:c};
    document.addEventListener(e, t.f, c);
    return t;
  },
  stopEvent: function(e)
  {
    e.stopPropagation();
    e.preventDefault();
  },
  hasTextSelection: function(e, precise)
  {
    var s = window.getSelection(), t = e.target;
    if(!String(s).match(/\S/)) return false;
    if(DCCT_Util.hasLink(t)) return true;
    return precise? (t.tagName == 'TEXTAREA' ||
                     (s.baseNode.nodeType == 3 && t == s.baseNode.parentNode))
                         : true;
  },
  hasLink: function(e)
  {
    if(e) do { if(e.tagName == 'A') return e; } while(e = e.parentNode);
  }
};
DCCT_MouseHandler.init();
