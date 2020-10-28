# Sketch Plugin UI

Simple UI functions for Sketch plugins. Provides preset status messages and dialog windows with accessories and scroll views.

## Installation

```bash
npm i @ozgurgunes/sketch-plugin-ui
```

## Usage

#### Show a Simple Message with the Command Name

My Plugin Command:  Hello Wold!

```javascript
import { showMessage } from '@ozgurgunes/sketch-plugin-ui'

showMessage('Hello Wold!')
```
#### Show a Message with Check Mark Button Emoji

✅   My Plugin Command:  It works!

```javascript
import { successMessage } from '@ozgurgunes/sketch-plugin-ui'

successMessage('It works!')
```

#### Show a Message with Warning Emoji

⚠️   My Plugin Command:  Something gone bad!

```javascript
import { errorMessage } from '@ozgurgunes/sketch-plugin-ui'

errorMessage('Something gone bad!')
```

#### Show a Dialog

 Plugin icon, command name as title and an "OK" button.

```javascript
import { alert } from '@ozgurgunes/sketch-plugin-ui'

alert('Click OK to close this dialog.').runModal()
```

#### Show a Sheet

 Attach alert as a sheet to given document.

```javascript
import { alert } from '@ozgurgunes/sketch-plugin-ui'

alert('Click OK to close this dialog.').runSheet(context.document)
```

#### Get User Input

An autocomplete combo box, which user can pick an option or type new one.

```javascript
import {
  comboBox,
  alert,
  errorMessage,
  successMessage,
} from "@ozgurgunes/sketch-plugin-ui"

var buttons = ["OK", "Cancel"]
var info = "Please type or pick something in the combo box."
var options = ["An option", "Another option"]
var accessory = comboBox(options)
var response = alert(info, buttons, accessory).runModal()
var result = accessory.stringValue()
if (response === 1000) {
  if (!result.length() > 0) {
    // User clicked "OK" without entering anything.
    errorMessage("You didn't enter anything.")
  } else {
    successMessage('You entered "' + result + '"')
  }
}
```

#### Get User Selection:

A scrollable checkbox list with an additional `Select All` button.

```javascript
import {
  optionList,
  scrollView,
  alert,
  errorMessage,
  successMessage
} from '@ozgurgunes/sketch-plugin-ui'

var buttons = ['Select', 'Cancel', 'Select All']
var info = 'Please select options.'
var options = ['An option', 'Another option']
var list = optionList(options)
var accessory = scrollView(list.view)
var response = alert(info, buttons, accessory).runModal()

if (response === 1002) {
  // User clicked to "Select All".
  // Get a confirmation before selecting all.
  var message = 'Are you sure?'
  info = 'All options will be deleted!'
  buttons = ['Select All', 'Cancel']
  var confirmed = alert(info, buttons, null, message).runModal()
  if (confirmed === 1000) {
    // User is sure to select all.
    list.options.map(option => option.setState(true))
    successMessage('All ' + options.length + ' option selected.')
  }
}

if (response === 1000) {
  if (list.getSelection().length == 0) {
    // User clicked to "Select" button, without selecting any option.
    errorMessage('Nothing selected.')
  } else {
    successMessage(list.getSelection().length + ' options selected.')
  }
}
```

## Functions

* [showMessage(text, [status], [document])](#showMessage)
* [errorMessage(text, [document])](#errorMessage)
* [successMessage(text, [document])](#successMessage)
* [alert(info, [accessory], [buttons], [message], [type])](#alert) ⇒ <code>NSAlert</code>
    * [.runSheet([document])](#alert.runSheet)
* [inputLabel(text, [frame], [size], [bold])](#inputLabel) ⇒ <code>NSTextField</code>
* [textField([initial], [frame])](#textField) ⇒ <code>NSTextField</code>
* [comboBox(items, [frame])](#comboBox) ⇒ <code>NSComboBox</code>
* [popUpButton(items, [frame])](#popUpButton) ⇒ <code>NSPopUpButton</code>
* [slider(options, [frame])](#slider) ⇒ <code>NSSlider</code>
* [scrollView(documentView, [frame], [horizontal], [vertical])](#scrollView) ⇒ <code>NSView</code>
* [optionList(items, [width])](#optionList) ⇒ [<code>CheckboxList</code>](#CheckboxList)
* [textList(items, [width])](#textList) ⇒ <code>NSView</code>

## Typedefs

* [CheckboxList](#CheckboxList) : <code>Object</code>

<a name="showMessage"></a>

## showMessage(text, [status], [document])
Shows a temporary message at the bottom of the document. Message starts with
the running command name.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The message to show. |
| [status] | <code>&#x27;error&#x27;</code> \| <code>&#x27;success&#x27;</code> | Puts an emoji before the command name (⚠️ or ✅). |
| [document] | <code>Document</code> | The document which the message will be shown in. Default is `context.document` |

<a name="errorMessage"></a>

## errorMessage(text, [document])
Shows a message with error status.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The message to show. |
| [document] | <code>Document</code> | The document which the message will be shown in. Default is `context.document` |

<a name="successMessage"></a>

## successMessage(text, [document])
Shows a message with success status.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The message to show. |
| [document] | <code>Document</code> | The document which the message will be shown in. Default is `context.document` |

<a name="alert"></a>

## alert(info, [accessory], [buttons], [message], [type]) ⇒ <code>NSAlert</code>
An alert with a combination of message, information text, buttons, and
accessories.

**Kind**: global function  
**Returns**: <code>NSAlert</code> - A preset `NSAlert` with a `runSheet` method attached.  

| Param | Type | Description |
| --- | --- | --- |
| info | <code>string</code> | The message to show in dialog. |
| [accessory] | <code>object</code> | An AppKit view or control to place in dialog for user inputs. |
| [buttons] | <code>Array.&lt;string&gt;</code> | Buttons to display in dialog for user actions. Default is `['OK']` |
| [message] | <code>string</code> | Title of dialog message. Default is `context.command.name()` |
| [type] | <code>number</code> | Indicates the alert’s severity level. Default is `0` |

<a name="alert.runSheet"></a>

### alert.runSheet([document])
Runs the alert modally as a sheet attached to the specified window.

**Kind**: static method of [<code>alert</code>](#alert)  

| Param | Type | Description |
| --- | --- | --- |
| [document] | <code>Document</code> | The document which to display the sheet on window. Default is `context.document` |

<a name="inputLabel"></a>

## inputLabel(text, [frame], [size], [bold]) ⇒ <code>NSTextField</code>
Simple text label for input fields.

**Kind**: global function  
**Returns**: <code>NSTextField</code> - Uneditable text field to display.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The label text to display. |
| [frame] | <code>NSRect</code> | The rectangle of the text field, specified in points in the coordinate space of the enclosing view. Default is `NSMakeRect(0, 0, 240, 18)` |
| [size] | <code>number</code> | The font size of the text. Default is `NSFont.systemFontSize()` |
| [bold] | <code>boolean</code> | Specifies whether display the text bold. Default is `false` |

<a name="textField"></a>

## textField([initial], [frame]) ⇒ <code>NSTextField</code>
Returns a text input accessory.

**Kind**: global function  
**Returns**: <code>NSTextField</code> - Text input with initial value.  

| Param | Type | Description |
| --- | --- | --- |
| [initial] | <code>string</code> | Default input text. |
| [frame] | <code>NSRect</code> | The rectangle of the control, specified in points in the coordinate space of the enclosing view. Default is `NSMakeRect(0, 0, 240, 25)` |

<a name="comboBox"></a>

## comboBox(items, [frame]) ⇒ <code>NSComboBox</code>
Returns an editable, autocomplete combo box accessory.

**Kind**: global function  
**Returns**: <code>NSComboBox</code> - Combo box with options.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed in combo box. |
| [frame] | <code>NSRect</code> | The rectangle of the control, specified in points in the coordinate space of the enclosing view. Default is `NSMakeRect(0, 0, 240, 25)` |

<a name="popUpButton"></a>

## popUpButton(items, [frame]) ⇒ <code>NSPopUpButton</code>
Returns a pop up button accessory.

**Kind**: global function  
**Returns**: <code>NSPopUpButton</code> - Pop up button with options.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed in pop up button. |
| [frame] | <code>NSRect</code> | The rectangle of the control, specified in points in the coordinate space of the enclosing view. Default is `NSMakeRect(0, 0, 240, 25)` |

<a name="slider"></a>

## slider(options, [frame]) ⇒ <code>NSSlider</code>
Returns a slider accessory with tick marks for given range.

**Kind**: global function  
**Returns**: <code>NSSlider</code> - Slider with given range.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Properties of the slider. |
| [frame] | <code>NSRect</code> | The rectangle of the control, specified in points in the coordinate space of the enclosing view. Default is `NSMakeRect(0, 0, 240, 25)` |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [options.minValue] | <code>number</code> | Minimum selectable value of slider. Default is `1` |
| [options.maxValue] | <code>number</code> | Maximum selectable value of slider. Default is `10` |
| [options.initialValue] | <code>number</code> | Initial selected value of slider. Default is `1` |

<a name="scrollView"></a>

## scrollView(documentView, [frame], [horizontal], [vertical]) ⇒ <code>NSView</code>
Returns a vertically scrollable accessory with given view.

**Kind**: global function  
**Returns**: <code>NSView</code> - View with scrollable content.  

| Param | Type | Description |
| --- | --- | --- |
| documentView | <code>NSView</code> | The view the scroll view scrolls within its content view. |
| [frame] | <code>NSRect</code> | The rectangle of the scroll view. Default is `NSMakeRect(0, 0, 320, 120)` |
| [horizontal] | <code>boolean</code> | A Boolean that indicates whether the scroll view has a horizontal scroller. Default is `false` |
| [vertical] | <code>boolean</code> | A Boolean that indicates whether the scroll view has a vertical scroller. Default is `true` |

<a name="optionList"></a>

## optionList(items, [width]) ⇒ [<code>CheckboxList</code>](#CheckboxList)
Returns a checkbox list accessory of options.

**Kind**: global function  
**Returns**: [<code>CheckboxList</code>](#CheckboxList) - List of options.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed with checkboxes. |
| [width] | <code>number</code> | Width of the options. Default is `320` |

<a name="textList"></a>

## textList(items, [width]) ⇒ <code>NSView</code>
Returns a text list accesory.

**Kind**: global function  
**Returns**: <code>NSView</code> - List of items.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed in scroll view. |
| [width] | <code>number</code> | Width of the list items. Default is `320` |

<a name="CheckboxList"></a>

## CheckboxList : <code>Object</code>
A dictionary of required components to get user selection.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;NSButton&gt;</code> | List of checkboxes. |
| view | <code>NSView</code> | View of options. |
| getSelection | <code>function</code> | Returns indexes of selected options. |

