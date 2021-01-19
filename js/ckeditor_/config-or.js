
CKEDITOR.editorConfig = function( config ) {

config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = 'About,Source,Save,NewPage,Preview,Print,Templates,Cut,Undo,Find,SelectAll,Scayt,Form,Copy,Redo,Replace,Paste,Checkbox,Radio,TextField,Textarea,Select,Button,HiddenField,Strike,Subscript,RemoveFormat,Blockquote,CreateDiv,BidiLtr,Language,BidiRtl,Anchor,Image,Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,ImageButton,Styles,Format,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks';

	config.removeDialogTabs = 'link:advanced';
};
