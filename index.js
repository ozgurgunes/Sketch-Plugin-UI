/**
 * Shows a temporary message at the bottom of the document. Message starts with
 * the running command name.
 *
 * @param {string} text The message to show.
 * @param {'error' | 'success'} [status] Puts an emoji before the command name
 *     (⚠️ or ✅).
 * @param {Document} [document] The document which the message will be shown in.
 *     Default is `context.document`
 */
export function showMessage(text, status, document = context.document) {
  let emoji = ''
  switch (status) {
    case 'error':
      emoji = '⚠️  '
      break
    case 'success':
      emoji = '✅  '
      break
  }
  document.showMessage(emoji + context.command.name() + ': ' + text)
}

/**
 * Shows a message with error status.
 *
 * @param {string} text The message to show.
 * @param {Document} [document] The document which the message will be shown in.
 *     Default is `context.document`
 */
export function errorMessage(text, document = context.document) {
  showMessage(text, 'error', document)
}

/**
 * Shows a message with success status.
 *
 * @param {string} text The message to show.
 * @param {Document} [document] The document which the message will be shown in.
 *     Default is `context.document`
 */
export function successMessage(text, document = context.document) {
  showMessage(text, 'success', document)
}

/**
 * An alert with a combination of message, information text, buttons, and
 * accessories.
 *
 * @param {string} info The message to show in dialog.
 * @param {object} [accessory] An AppKit view or control to place in dialog for
 *     user inputs.
 * @param {string[]} [buttons] Buttons to display in dialog for user actions.
 *     Default is `['OK']`
 * @param {string} [message] Title of dialog message. Default is
 *     `context.command.name()`
 * @param {number} [type] Indicates the alert’s severity level. Default is `0`
 * @returns {NSAlert} Modal dialog window.
 */
export function alert(info, buttons, accessory, message, type = 0) {
  buttons = buttons || ['OK']
  message = message || context.command.name()
  var alert = NSAlert.alloc().init()
  alert.setMessageText(message)
  alert.setInformativeText(info)
  alert.alertStyle = type
  buttons.map(button => alert.addButtonWithTitle(button))
  if (context.plugin.alertIcon()) {
    alert.icon = context.plugin.alertIcon()
  }
  if (accessory) {
    alert.setAccessoryView(accessory)
    alert.window().setInitialFirstResponder(accessory)
  }
  return alert
}

/**
 * Runs the alert as an app-modal dialog.
 *
 * @param {NSAlert} alert A preset alert to run.
 * @returns {number} The constant that identifies the button clicked.
 */
export function showDialog(alert) {
  return alert.runModal()
}

/**
 * Runs the alert modally as a sheet attached to the specified window.
 *
 * @param {NSAlert} alert A preset alert to run.
 * @param {Document} [document] The document which to display the sheet on
 *     window. Default is `context.document`
 * @returns {number} The constant that identifies the button clicked.
 */
export function showSheet(alert, document = context.document) {
  let window = (document.sketchObject || document).documentWindow()
  alert.beginSheetModalForWindow_completionHandler(
    window,
    __mocha__.createBlock_function('v16@?0q8', function onCompletion(
      _returnCode
    ) {
      NSApp.stopModalWithCode(_returnCode)
    })
  )
  let response = NSApp.runModalForWindow(window)
  NSApp.endSheet(alert)
  return response
}

/**
 * Simple text label for input fields.
 *
 * @param {string} text The label text to display.
 * @param {NSRect} [frame] The rectangle of the text field, specified in
 *     points in the coordinate space of the enclosing view. Default is
 *     `NSMakeRect(0, 0, 240, 25)`
 * @param {number} [size] The font size of the text. Default is
 *     `NSFont.systemFontSize()`
 * @param {boolean} [bold] Specifies whether display the text bold. Default is
 *     `false`
 * @returns {NSTextField} Uneditable text field to display.
 */
export function inputLabel(text, frame, size, bold = false) {
  frame = frame || NSMakeRect(0, 0, 240, 18)
  size = size || NSFont.systemFontSize()
  let label = NSTextField.alloc().initWithFrame(frame)
  label.setFont(
    bold ? NSFont.boldSystemFontOfSize(size) : NSFont.systemFontOfSize(size)
  )
  label.setEditable(false)
  label.setSelectable(false)
  label.setStringValue(text)
  label.setBezeled(false)
  label.setDrawsBackground(false)

  return label
}

/**
 * Returns a text input accessory.
 *
 * @param {string} [initial] Default input text.
 * @param {NSRect} [frame] The rectangle of the control, specified in
 *     points in the coordinate space of the enclosing view. Default is
 *     `NSMakeRect(0, 0, 240, 25)`
 * @returns {NSTextField} Text input with initial value.
 */
export function textField(initial = '', frame) {
  frame = frame || NSMakeRect(0, 0, 240, 18)
  let accessory = NSTextField.alloc().initWithFrame(frame)
  accessory.setStringValue(initial)
  return accessory
}

/**
 * Returns an editable, autocomplete combo box accessory.
 *
 * @param {string[]} items Options to be listed in combo box.
 * @param {NSRect} [frame] The rectangle of the control, specified in
 *     points in the coordinate space of the enclosing view. Default is
 *     `NSMakeRect(0, 0, 240, 25)`
 * @returns {NSComboBox} Combo box with options.
 */
export function comboBox(items = [], frame) {
  frame = frame || NSMakeRect(0, 0, 240, 25)
  let accessory = NSComboBox.alloc().initWithFrame(frame)
  accessory.addItemsWithObjectValues(items)
  accessory.setEditable(true)
  accessory.setCompletes(true)
  return accessory
}

/**
 * Returns a pop up button accessory.
 *
 * @param {string[]} items Options to be listed in pop up button.
 * @param {NSRect} [frame] The rectangle of the control, specified in
 *     points in the coordinate space of the enclosing view. Default is
 *     `NSMakeRect(0, 0, 240, 25)`
 * @returns {NSPopUpButton} Pop up button with options.
 */
export function popUpButton(items = [], frame) {
  frame = frame || NSMakeRect(0, 0, 240, 25)
  let accessory = NSPopUpButton.alloc().initWithFrame(frame)
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
 * @param {NSRect} [frame] The rectangle of the control, specified in
 *     points in the coordinate space of the enclosing view. Default is
 *     `NSMakeRect(0, 0, 240, 25)`
 * @returns {NSSlider} Slider with given range.
 */
export function slider(
  { minValue = 1, maxValue = 10, initialValue = 1 },
  frame
) {
  frame = frame || NSMakeRect(0, 0, 240, 25)
  let accessory = NSSlider.alloc().initWithFrame(frame)
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
 * @param {NSView} documentView The view the scroll view scrolls within its
 *     content view.
 * @param {NSRect} [frame] The rectangle of the scroll view. Default is
 *     `NSMakeRect(0, 0, 320, 120)`
 * @param {boolean} [horizontal] A Boolean that indicates whether the scroll
 *     view has a horizontal scroller. Default is `false`
 * @param {boolean} [vertical] A Boolean that indicates whether the scroll view
 *     has a vertical scroller. Default is `true`
 * @returns {NSView} View with scrollable content.
 */
export function scrollView(
  documentView,
  frame,
  horizontal = false,
  vertical = true
) {
  frame = frame || NSMakeRect(0, 0, 320, 120)
  let scrollView = NSScrollView.alloc().initWithFrame(frame)
  scrollView.setHasVerticalScroller(vertical)
  scrollView.setHasHorizontalScroller(horizontal)
  scrollView.setDocumentView(documentView)
  return scrollView
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
 * @param {number} [width] Width of the options. Default is `320`
 * @returns {CheckboxList} List of options.
 */
export function optionList(items, width = 320) {
  let listView = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, width, items.length * 25 + 10)
  )
  let options = []
  items.map((item, i) => {
    options[i] = NSButton.alloc().initWithFrame(
      NSMakeRect(5, 5 + i * 25, width - 10, 25)
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
 * @param {number} [width] Width of the list items. Default is `320`
 * @returns {NSView} List of items.
 */
export function textList(items, width = 320) {
  let listView = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, width, items.length * 25 + 10)
  )
  let font = NSFont.systemFontOfSize(NSFont.systemFontSize())
  let errors = []
  items.map((item, i) => {
    errors[i] = NSTextView.alloc().initWithFrame(
      NSMakeRect(5, 10 + i * 25, width - 10, 10)
    )
    errors[i].insertText(item)
    errors[i].setFont(font)
    errors[i].setEditable(false)
    listView.addSubview(errors[i])
  })
  listView.setFlipped(true)
  return listView
}
