Armadillo.IO = {
		read: function(srcfile){
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				} catch (e) {
					alert("Permission to read file was denied.");
				}
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				file.initWithPath( srcfile );
				if ( file.exists() == false ) {
					alert("File does not exist");
				}
				var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
				is.init( file,0x01, 00004, null);
				var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
				sis.init( is );
				var output = sis.read( sis.available() );
				return output;
		},
		readEntireFile: function(file){
			var data = '';
			var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
			fstream.init(file, -1, 0, 0);
			var charset = "UTF-8"; // sux
			const replacementChar = Components.interfaces.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER;
			var is = Components.classes["@mozilla.org/intl/converter-input-stream;1"].createInstance(Components.interfaces.nsIConverterInputStream);
			is.init(fstream, charset, 1024, replacementChar);
			var str = {};
			while (is.readString(4096, str) != 0) {
			  data += str.value;
			}
			is.close();
			
			return data;
		},
		write: function(file, text){
			  var ostream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
			  ostream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);
			  var charset = "UTF-8"; // sux
			
			  var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"].createInstance(Components.interfaces.nsIConverterOutputStream);
			  os.init(ostream, charset, 4096, 0x0000);
			  os.writeString(text);
			  os.close();
		}
};