# Sketch Plugin UI

Simple UI functions for Sketch plugins. Provides preset status messages and dialog windows with rich accessories and scroll views.

## Installation

```bash
npm i @ozgurgunes/sketch-plugin-ui
```

## Usage

#### Show a Simple Message with the Command Name

My Plugin Command:  Hello Wold!

```javascript
import { message } from '@ozgurgunes/sketch-plugin-ui'

message('Hello Wold!')
```
#### Show a Message with Check Mark Button Emoji

✅   My Plugin Command:  It works!

```javascript
import { success } from '@ozgurgunes/sketch-plugin-ui'

success('It works!')
```

#### Show a Message with Warning Emoji

⚠️   My Plugin Command:  Something gone bad!

```javascript
import { error } from '@ozgurgunes/sketch-plugin-ui'

error('Something gone bad!')
```

#### Show a Dialog

 Plugin icon, command name as title and an "OK" button.

```javascript
import { dialog } from '@ozgurgunes/sketch-plugin-ui'

dialog('Click OK to close this dialog.')
```

#### Get User Input

An autocomplete combo box, which user can pick an option or type new one.

```javascript
import { comboBox, dialog, error, success } from '@ozgurgunes/sketch-plugin-ui'

var buttons = ['OK', 'Cancel']
var info = 'Please type or pick something in the combo box.'
var options = ['An option', 'Another option']
var accessory = comboBox(options)
var response = dialog(info, accessory, buttons)
var result = accessory.stringValue()
if (response === 1000) {
  if (!result.length() > 0) {
    // User clicked "OK" without entering anything.
    error("You didn't enter anything.")
  } else {
    success('You entered "' + result + '"')
  }
}
```

#### Get User Selection:

A scrollable checkbox list with an additional `Select All` button.

```javascript
import {
  optionList,
  scrollView,
  dialog,
  error,
  success
} from '@ozgurgunes/sketch-plugin-ui'

var buttons = ['Select', 'Cancel', 'Select All']
var info = 'Please select options.'
var options = ['An option', 'Another option']
var list = optionList(options)
var accessory = scrollView(list.view)
var response = dialog(info, accessory, buttons)
if (response === 1002) {
  // User clicked to "Select All".
  // Get a confirmation before selecting all.
  var message = 'Are you sure?'
  info = 'All options will be deleted!'
  buttons = ['Select All', 'Cancel']
  var confirmed = dialog(info, null, buttons, message)
  if (confirmed === 1000) {
    // User is sure to select all.
    list.options.map(option => option.setState(true))
    success('All ' + options.length + ' option selected.')
  }
}
if (response === 1000) {
  if (list.getSelection().length == 0) {
    // User clicked to "Select" button, without selecting any option.
    error('Nothing selected.')
  } else {
    success(list.getSelection().length + ' options selected.')
  }
}
```

## Functions

* [message(text, [status])](#message)
* [error(text)](#error) ⇒ [<code>message</code>](#message)
* [success(text)](#success) ⇒ [<code>message</code>](#message)
* [dialog(info, [accessory], [buttons], [message])](#dialog) ⇒ <code>NSAlert</code>
* [textField([initial])](#textField) ⇒ <code>NSTextField</code>
* [comboBox(items)](#comboBox) ⇒ <code>NSComboBox</code>
* [popUpButton(items)](#popUpButton) ⇒ <code>NSPopUpButton</code>
* [slider([options])](#slider) ⇒ <code>NSSlider</code>
* [scrollView(view)](#scrollView) ⇒ <code>NSView</code>
* [optionList(items)](#optionList) ⇒ [<code>CheckboxList</code>](#CheckboxList)
* [textList(items)](#textList) ⇒ <code>NSView</code>

## Typedefs

* [CheckboxList](#CheckboxList) : <code>Object</code>

<a name="message"></a>

## message(text, [status])
Shows a temporary message at the bottom of the document. Message starts with
the running command name.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The message to show. |
| [status] | [<code>error</code>](#error) \| [<code>success</code>](#success) | Puts and emoji before the command name                                 (⚠️|✅). |

<a name="error"></a>

## error(text) ⇒ [<code>message</code>](#message)
Shows a message with error status.

**Kind**: global function  
**Returns**: [<code>message</code>](#message) - Message with `error` status.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The message to show. |

<a name="success"></a>

## success(text) ⇒ [<code>message</code>](#message)
Shows a message with success status.

**Kind**: global function  
**Returns**: [<code>message</code>](#message) - Message with `success` status.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The message to show. |

<a name="dialog"></a>

## dialog(info, [accessory], [buttons], [message]) ⇒ <code>NSAlert</code>
Shows a customizable modal dialog.

**Kind**: global function  
**Returns**: <code>NSAlert</code> - Modal dialog window.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| info | <code>string</code> |  | The message to show in dialog. |
| [accessory] | <code>object</code> |  | An AppKit view or control to place in dialog for                             user inputs. |
| [buttons] | <code>Array.&lt;string&gt;</code> | <code>[&#x27;OK&#x27;]</code> | Buttons to display in dialog for                                          user actions. |
| [message] | <code>string</code> | <code>&quot;context.command.name()&quot;</code> | Title of dialog message. |

<a name="textField"></a>

## textField([initial]) ⇒ <code>NSTextField</code>
Returns a text input accessory.

**Kind**: global function  
**Returns**: <code>NSTextField</code> - Text input with initial value.  

| Param | Type | Description |
| --- | --- | --- |
| [initial] | <code>string</code> | Default input text. |

<a name="comboBox"></a>

## comboBox(items) ⇒ <code>NSComboBox</code>
Returns an editable, autocomplete combo box accessory.

**Kind**: global function  
**Returns**: <code>NSComboBox</code> - Combo box with options.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed in combo box. |

<a name="popUpButton"></a>

## popUpButton(items) ⇒ <code>NSPopUpButton</code>
Returns a pop up button accessory.

**Kind**: global function  
**Returns**: <code>NSPopUpButton</code> - Pop up button with options.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed in pop up button. |

<a name="slider"></a>

## slider([options]) ⇒ <code>NSSlider</code>
Returns a slider accessory.

**Kind**: global function  
**Returns**: <code>NSSlider</code> - Slider with given range.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Properties of the slider. |
| [options.initialValue] | <code>number</code> | <code>5</code> | Default selected value of slider. |
| [options.minValue] | <code>number</code> | <code>1</code> | Minimum selectable value of slider. |
| [options.maxValue] | <code>number</code> | <code>10</code> | Maximum selectable value of slider. |

<a name="scrollView"></a>

## scrollView(view) ⇒ <code>NSView</code>
Returns a vertically scrollable accessory with given view.

**Kind**: global function  
**Returns**: <code>NSView</code> - View with scrollable content.  

| Param | Type | Description |
| --- | --- | --- |
| view | <code>object</code> | Accessory to be placed in scroll view. |

<a name="optionList"></a>

## optionList(items) ⇒ [<code>CheckboxList</code>](#CheckboxList)
Returns a checkbox list accessory of options.

**Kind**: global function  
**Returns**: [<code>CheckboxList</code>](#CheckboxList) - List of options.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed with checkboxes. |

<a name="textList"></a>

## textList(items) ⇒ <code>NSView</code>
Returns a text list accesory.

**Kind**: global function  
**Returns**: <code>NSView</code> - List of items.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Options to be listed in scroll view. |

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

