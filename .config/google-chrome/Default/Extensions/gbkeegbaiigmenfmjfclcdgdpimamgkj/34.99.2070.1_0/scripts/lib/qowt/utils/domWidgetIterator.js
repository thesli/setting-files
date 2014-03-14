/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview Iterator for the DOM elements that iterates over the all the
 * children of a given HTML element or widget and return awesome widgets
 * that encapsulate the child HTML elements.
 *
 * Idea is to use the domWidgetIterator in the renderTests and interactionTests
 * so that given a DOM element we can easily iterate over the children widgets
 * and test the widgets and its propeties rather than relying on the underlying
 * HTML implementation (which could change anytime).
 *
 * To use:
 * define('qowtRoot/utils/domWidgetIterator', function(DOMWidgetIterator) {
 *   ‘use strict’;
 *   var sectionIterator = new DOMWidgetIterator({
 *     widget: _sectionWidget
 *   });
 *  // iterate over all the direct children of the section widget.
 *  while (sectionIterator.hasNext()) {
 *    var widget = sectionIterator.next();
 *    widget.doSomethingNice();
 *  }
 *  // another handy way to iterate:
 *  sectionIterator.each(myCallbackFunction);
 * });
 *
 * more info in the unit tests: domWidgetIterator-test.js.
 *
 * @author sakhyaghosh@google.com (Sakhya Ghosh)
 */

define([
  'qowtRoot/widgets/factory',
  'qowtRoot/utils/typeUtils'
], function(
  WidgetFactory,
  TypeUtils) {

  'use strict';

  /**
   * domWidgetIterator constructor.
   * Given a root HTML element or widget(that encapsulates HTML element(s)),
   * it will iterate over either the
   * direct children or all the children of the root HTML element,
   * and return the Iterator to iterate over the appropriate Widget objects.
   *
   * @param {Object} config Configuration object, consists of:
   * @param {Object} config.widget Widget object which encapsulates the HTML
   *                               element (the root element for the iterator).
   *                               require either config.widget OR
   *                               config.element to initialize the iterator.
   * @param {Object} config.element HTML Element that acts as the
   *                                root element for the iterator.
   *                                require either config.widget OR
   *                                config.element to initialize the iterator.
   * @param {bool} config.allChildren if true: iterates over the root element
   *                                  and all elements below it in the
   *                                  depth-first (DFS) order.
   *                                  if false: iterates over the direct
   *                                  sub-elements.
   * @param {Array} config.ignoreFilterList Array list of widget content types
   *                                        we want the iterator to ignore like:
   *                                        ['paragraph', 'inline-img']
   */
  var DOMWidgetIterator = function(config) {
    /**
     * @private
     * List of all widgets that would be iterated over.
     */
    this.widgets_ = [];
    /**
     * @private
     * Current index to the list of widgets.
     */
    this.index_ = 0;
    /**
     * @private
     * Save the configuration object.
     */
    this.config_ = config;

    /**
     * @private
     * the HTML Element rootElement for the iterator.
     */
    this.rootElement_ = undefined;

    // call the initialization method.
    init_.call(this);
  };

  DOMWidgetIterator.prototype = {
    /**
     * @public
     * Returns the next Widget Object.
     * If there are no further Widget objects it returns null.
     * @return {Object || null} Widget object or null.
     */
    next: function() {
      if (this.hasNext()) {
        return this.widgets_[this.index_++];
      }
      return null;
    },

    /**
     * @public
     * Returns true if there are more Widgets objects to iterate over.
     * @return {bool}
     */
    hasNext: function() {
      return this.index_ < this.widgets_.length;
    },

    /**
     * @public
     * Returns true if there are no Widget objects.
     * @return {bool}
     */
    isEmpty: function() {
      return this.widgets_.length === 0;
    },

    /**
     * @public
     * Reset the internal state of the Iterator.
     */
    reset: function() {
      this.index_ = 0;
    },

    /**
     * @public
     * Returns the current widget object.
     * @return {Object || undefined} current widget.
     */
    current: function() {
      return this.widgets_[this.index_];
    },

    /**
     * @public
     * Iterate over every Widget object and call the callback passed in.
     * @param {Object} callback callback function called on every Widget object.
     * @param {Object} opt_callbackObj object to use to call the callback
     *                                 function, usually used to binf 'this'
     *                                 for the callback function.
     */
    each: function(callback, opt_callbackObj) {
      while (this.hasNext()) {
        var widget = this.next();
        if (callback && TypeUtils.isFunction(callback)) {
          callback.apply(opt_callbackObj, [widget]);
        }
      }
    }
  };

  // -------------------- PRIVATE ---------------------

  /**
   * @private
   * Main creation method that will create the iterator.
   * Calls the iterate method to iterate over the children.
   *
   * @see iterateChildren_
   */
  var init_ = function() {
    // look for the root element,
    // either from the config.element or config.widget.
    if (this.config_.widget) {
      this.rootElement_ = (
        this.config_.widget.getWidgetElement) ?
        this.config_.widget.getWidgetElement() : undefined;
    } else if (this.config_.element) {
      this.rootElement_ = (
        this.config_.element instanceof HTMLElement) ?
        this.config_.element : undefined;
    }
    if (!this.rootElement_) {
      throw new Error('Error: could not create iterator expecting a ' +
                      'widget or HTML element.');
    }
    iterateChildren_.call(this);
  };

  /**
   * @private
   * Iterate over the children of the root element.
   *
   * @see this.config_.allChildren
   */
  var iterateChildren_ = function() {
    if (this.config_.allChildren){
      iterateAllChildren_.call(this, storeWidgets_, this.rootElement_) ;
    } else {
      iterateDirectChildren_.call(this, storeWidgets_, this.rootElement_);
    }
  };

  /**
   * @private
   * Iterate over all the children of the root element
   * in the depth first order.
   *
   * @param {Object} action function to call on the element.
   * @param {HTML Element} element HTML element.
   */
  var iterateAllChildren_ = function(action, element) {
    element = element.firstElementChild;
    while (element) {
      action.call(this, element);
      iterateAllChildren_.call(this, action, element);
      element = element.nextElementSibling;
    }
  };

  /**
   * @private
   * Iterate over all the direct children of the root element.
   *
   * @param {Object} action function to call on the element.
   * @param {HTML Element} element HTML element.
   */
  var iterateDirectChildren_ = function(action, element) {
    element = element.firstElementChild;
    while (element) {
      action.call(this, element);
      element = element.nextElementSibling;
    }
  };

  /**
   * @private
   * Store Widgets in the widgets array.
   *
   * @param {HTML Element} element HTML element.
   * @see this.widgets_
   */
  var storeWidgets_ = function(element) {
    var widget = WidgetFactory.create({
      fromNode: element
    });
    if (filterWidget_.call(this, widget)) {
      return;
    }
    if (widget) {
      this.widgets_.push(widget);
    }
  };

  /**
   * @private
   * Filter out widgets that we are not interested in.
   *
   * @param {Object} widget encapsulates the HTML element.
   * @see config.ignoreFilterList
   */
  var filterWidget_ = function(widget) {
    if (widget && widget.getContentType &&
        this.config_.ignoreFilterList &&
        this.config_.ignoreFilterList.indexOf(
          widget.getContentType()) > -1) {
      return true;
    }
    return false;
  };

  return DOMWidgetIterator;
});
