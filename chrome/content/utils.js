Armadillo.Utils = {
    addClass: function(className){
      alert(content);
      
      /*
      var head = content.document.getElementsByTagName("head")[0];
      var style = content.document.getElementById("armadillo-style");
      if (!style) {
	      style = content.document.createElement("link");
	      style.id = "armadillo-style";
	      style.type = "text/css";
	      style.rel = "stylesheet";
	      style.href = "chrome://armadillo/skin/skin.css";
	      head.appendChild(style);
	      alert("added style");
      }
      */
    },
    replace: function(targetedNode, value){    
      
      var sourceNode = null;
      
      if (targetedNode.getAttributeNode("id") && targetedNode.getAttribute("id") != ""){
	sourceNode = sourceXML.getElementById(targetedNode.getAttribute("id"));
	return this.updateValue(sourceNode, targetedNode, value);
      }
      
      /*if target has no id, then find it*/
      var allSameTypeElements = sourceXML.getElementsByTagName(targetedNode.nodeName.toLowerCase());
      for (i=0; i<allSameTypeElements.length; i++){
	
	sourceNode = allSameTypeElements[i];
	
	var sourceInner = this.optimizeNode(sourceNode);
	var nodeString = this.optimizeNode(targetedNode);
	
	//alert(sourceInner + "\n--\n" + nodeString);
	
	if (sourceInner == nodeString && this.getThisIsTheRightNodePercent(sourceNode) > 50){
	  return this.updateValue(sourceNode, targetedNode, value);
	}
      }
      
      return false;
    },
    getThisIsTheRightNodePercent: function(node){
      //check node context to make sure this is the right node to update and no other similar node.
      //var parent = node.parentNode;
      return 100;
    },
    optimizeNode: function(node){
      var stringNode = node.innerHTML;
      
      //remove xmlns attr
      //node.removeAttribute("xmlns");
      stringNode = stringNode.replace(/ xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\"/g,"");
      
      //replace <br> elements
      stringNode = stringNode.replace(/\<br\>/g,'<br />');
      stringNode = stringNode.replace(/\<br\/\>/g,'<br />');
      
      return stringNode;
    },
    updateValue: function(sourceNode, targetedNode, value){
      var origValue = this.optimizeNode(sourceNode);
      
      try{
	sourceNode.innerHTML = value;
	targetedNode.innerHTML = value;
	return true;
      }
      catch(err){
	sourceNode.innerHTML = origValue;
	targetedNode.innerHTML = origValue;
	alert("Error: please make sure the content is well formed");
	return false;
      }
    }
};