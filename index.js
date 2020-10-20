/**
 * Shows a temporary message at the bottom of the document. Message starts with
 * the running command name.
 *
 * @param {string} text The message to show.
 * @param {'error' | 'success'} [status] Puts an emoji before the command name
 *     (⚠️ or ✅).
 */
export function message(text, status) {
  let emoji = ''
  switch (status) {
    case 'error':
      emoji = '⚠️  '
      break
    case 'success':
      emoji = '✅  '
      break
  }
  context.document.showMessage(emoji + context.command.name() + ': ' + text)
}

/**
 * Shows a message with error status.
 *
 * @param {string} text The message to show.
 * @returns {message} Message with `error` status.
 */
export function error(text) {
  return message(text, 'error')
}

/**
 * Shows a message with success status.
 *
 * @param {string} text The message to show.
 * @returns {message} Message with `success` status.
 */
export function success(text) {
  return message(text, 'success')
}

/**
 * Shows a customizable modal dialog.
 *
 * @param {string} info The message to show in dialog.
 * @param {object} [accessory] An AppKit view or control to place in dialog for
 *     user inputs.
 * @param {string[]} [buttons] Buttons to display in dialog for user actions.
 *     Default is `['OK']`
 * @param {string} [message] Title of dialog message. Default is
 *     `context.command.name()`
 * @returns {NSAlert} Modal dialog window.
 */
export function dialog(info, accessory, buttons, message) {
  buttons = buttons || ['OK']
  message = message || context.command.name()
  var alert = NSAlert.alloc().init()
  alert.setMessageText(message)
  alert.setInformativeText(info)
  buttons.map(button => alert.addButtonWithTitle(button))
  if (context.plugin.alertIcon()) {
    alert.icon = context.plugin.alertIcon()
  }
  if (accessory) {
    alert.setAccessoryView(accessory)
    if (!accessory.isMemberOfClass(NSTextView)) {
      alert.window().setInitialFirstResponder(accessory)
    }
  }
  return alert.runModal()
}

/**
 * Returns a text input accessory.
 *
 * @param {string} [initial] Default input text.
 * @returns {NSTextField} Text input with initial value.
 */
export function textField(initial='') {
  let accessory = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
  accessory.setStringValue(initial)
  return accessory
}

/**
 * Returns an editable, autocomplete combo box accessory.
 *
 * @param {string[]} items Options to be listed in combo box.
 * @returns {NSComboBox} Combo box with options.
 */
export function comboBox(items) {
  let accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
  accessory.addItemsWithObjectValues(items)
  accessory.setEditable(true)
  accessory.setCompletes(true)
  return accessory
}

/**
 * Returns a pop up button accessory.
 *
 * @param {string[]} items Options to be listed in pop up button.
 * @returns {NSPopUpButton} Pop up button with options.
 */
export function popUpButton(items) {
  let accessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
  accessory.addItemsWithTitles(items)
  return accessory
}

/**
 * Returns a slider accessory with tick marks for given range.
 *
 * @property {number} [options.minValue] Minimum selectable value of slider.
 *     Default is `1`
 * @property {number} [options.maxValue] Maximum selectable value of slider.
 *     Default is `10`
 * @property {number} [options.initialValue] Initial selected value of slider.
 *     Default is `1`
 * @param {Object} options Properties of the slider.
 * @returns {NSSlider} Slider with given range.
 */
export function slider({ minValue = 1, maxValue = 10, initialValue = 1 }) {
  let accessory = NSSlider.alloc().initWithFrame(NSMakeRect(0, 0, 240, 25))
  accessory.setMinValue(minValue)
  accessory.setMaxValue(maxValue)
  accessory.setValue(initialValue)
  accessory.setAllowsTickMarkValuesOnly(true)
  accessory.setNumberOfTickMarks(1 + maxValue - minValue)
  return accessory
}

/**
 * Returns a vertically scrollable accessory with given view.
 *
 * @param {object} view Accessory to be placed in scroll view.
 * @returns {NSView} View with scrollable content.
 */
export function scrollView(view) {
  let accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120))
  let scrollView = NSScrollView.alloc().initWithFrame(
    NSMakeRect(0, 0, 300, 120)
  )
  scrollView.setHasVerticalScroller(true)
  scrollView.setHasHorizontalScroller(false)
  scrollView.setDocumentView(view)
  accessory.addSubview(scrollView)
  return accessory
}

/**
 * A dictionary of required components to get user selection.
 *
 * @typedef {Object} CheckboxList
 * @property {NSButton[]} options List of checkboxes.
 * @property {NSView} view View of options.
 * @property {function} getSelection Returns indexes of selected options.
 */

/**
 * Returns a checkbox list accessory of options.
 *
 * @param {string[]} items Options to be listed with checkboxes.
 * @returns {CheckboxList} List of options.
 */
export function optionList(items) {
  let listView = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, 300, items.length * 24 + 10)
  )
  let options = []
  items.map((item, i) => {
    options[i] = NSButton.alloc().initWithFrame(
      NSMakeRect(5, 5 + i * 24, 290, 20)
    )
    options[i].setButtonType(NSSwitchButton)
    options[i].setTitle(item)
    options[i].setState(false)
    listView.addSubview(options[i])
    listView.setFlipped(true)
  })
  return {
    options: options,
    view: listView,
    getSelection: () => {
      let selection = []
      options.map((option, i) => {
        if (option.state()) {
          selection.push(i)
        }
      })
      return selection
    }
  }
}

/**
 * Returns a text list accesory.
 *
 * @param {string[]} items Options to be listed in scroll view.
 * @returns {NSView} List of items.
 */
export function textList(items) {
  let listView = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, 300, items.length * 24 + 10)
  )
  let font = NSFont.systemFontOfSize(NSFont.smallSystemFontSize())
  let errors = []
  items.map((item, i) => {
    errors[i] = NSTextView.alloc().initWithFrame(
      NSMakeRect(5, 10 + i * 24, 290, 20)
    )
    errors[i].insertText(item)
    errors[i].setFont(font)
    errors[i].setEditable(false)
    listView.addSubview(errors[i])
  })
  listView.setFlipped(true)
  return listView
}
