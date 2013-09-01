var Armadillo = {};


Armadillo.Const = {
	prefManager: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch)
};

/* Global vars */
var sourceXML = null;


/* Firefox init */
Armadillo.init = function(args){
      //get config
      //var autoRun = this.Const.prefManager.getBoolPref("extensions.armadillo.autorun");
      
      /* TODO: improve this, calling more than once*/
      if(gBrowser) gBrowser.addEventListener("DOMContentLoaded", this.onPageLoad, false);
};

Armadillo.onPageLoad = function(){
  sourceXML = null;
};

Armadillo.startEditing = function(target){
  if (!sourceXML){
    alert("Please select the corresponding file first!");
    this.selectFile();
    return;
  }
  var w = window.openDialog("chrome://armadillo/content/editContent.xul", "editcontent", "chrome,centerscreen", {armadillo: this, target:target});
};

Armadillo.updateOutput = function(target,newValue){
  var success = this.Utils.replace(target, newValue);
  if(!success){
    alert("Sorry, an error occurred and the content was not updated.");
    return;
  }
};

Armadillo.selectFile = function(){
  var nsIFilePicker = Components.interfaces.nsIFilePicker;
  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
  fp.init(window, "Select the source File", nsIFilePicker.modeOpen);
  if(fp.show() == nsIFilePicker.returnOK) {
      //sourceFile = this.IO.read(fp.file.path);
      var sourceFile = this.IO.readEntireFile(fp.file);
      
      try{
	  var parser=new DOMParser();
	  sourceXML = parser.parseFromString(sourceFile,'text/xml'); /*TODO: validate if XML is well formed*/

	  //get the root node
// 	  var docRoot = domDoc.getDocumentElement();

	  /*
	  var ns = sourceXML.getElementsByTagNameNS("*","*");
	  for (i=0; i<ns.length; i++){
	    if (ns[i].getAttributeNode("xmlns")){
 	      alert(ns[i].nodeName);
 	      ns[i].removeAttribute("xmlns");
	    }
	  }*/
      }
      catch(e) {alert("Oops, an error occurred. Please refresh and try again.")}
  }
};

Armadillo.saveFile = function(){
  if (!sourceXML) {
    alert("There is no file selected. Please select one and try again.");
    return;
  }
  
  var xmlString = (new XMLSerializer()).serializeToString(sourceXML);

  var nsIFilePicker = Components.interfaces.nsIFilePicker;
  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
  fp.init(window, "Select a File", nsIFilePicker.modeSave);
  var res = fp.show();
  if(res == nsIFilePicker.returnOK || res == nsIFilePicker.returnReplace) {
    this.IO.write(fp.file, xmlString);
  }
};

Armadillo.openAbout = function(){
  var w = window.openDialog("chrome://armadillo/content/about.xul", "About Armadillo", "chrome,centerscreen");
};
Armadillo.help = function(){
  var myUrl = "http://walterbrunetti.blogspot.com/p/armadillo-live.html";
  var tBrowser = document.getElementById("content");
  var tab = tBrowser.addTab(myUrl);
  tBrowser.selectedTab = tab;
};

/* Bindings */
window.addEventListener("load", Armadillo.init(), false);