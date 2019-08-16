const messages={'en':{'copy':'Copy','copy_to_clipboard':'Copy to clipboard','copy_success':'Copied!','copy_failure':'Failed to copy',},'es':{'copy':'Copiar','copy_to_clipboard':'Copiar al portapapeles','copy_success':'¡Copiado!','copy_failure':'Error al copiar',},'de':{'copy':'Kopieren','copy_to_clipboard':'In die Zwischenablage kopieren','copy_success':'Kopiert!','copy_failure':'Fehler beim Kopieren',}}
let locale='en'
if(document.documentElement.lang!==undefined&&messages[document.documentElement.lang]!==undefined){locale=document.documentElement.lang}
const runWhenDOMLoaded=cb=>{if(document.readyState!='loading'){cb()}else if(document.addEventListener){document.addEventListener('DOMContentLoaded',cb)}else{document.attachEvent('onreadystatechange',function(){if(document.readyState=='complete')cb()})}}
const codeCellId=index=>`codecell${index}`
const clearSelection=()=>{if(window.getSelection){window.getSelection().removeAllRanges()}else if(document.selection){document.selection.empty()}}
const temporarilyChangeTooltip=(el,newText)=>{const oldText=el.getAttribute('data-tooltip')
el.setAttribute('data-tooltip',newText)
setTimeout(()=>el.setAttribute('data-tooltip',oldText),2000)}
const addCopyButtonToCodeCells=()=>{if(window.ClipboardJS===undefined){setTimeout(addCopyButtonToCodeCells,250)
return}
const codeCells=document.querySelectorAll('div.highlight pre')
codeCells.forEach((codeCell,index)=>{const id=codeCellId(index)
codeCell.setAttribute('id',id)
const pre_bg=getComputedStyle(codeCell).backgroundColor;const clipboardButton=id=>`<a class="copybtn o-tooltip--left" style="background-color: ${pre_bg}" data-tooltip="${messages[locale]['copy']}" data-clipboard-target="#${id}">
      <img src="https://gitcdn.xyz/repo/choldgraf/sphinx-copybutton/master/sphinx_copybutton/_static/copy-button.svg" alt="${messages[locale]['copy_to_clipboard']}">
    </a>`
codeCell.insertAdjacentHTML('afterend',clipboardButton(id))})
const clipboard=new ClipboardJS('.copybtn')
clipboard.on('success',event=>{clearSelection()
temporarilyChangeTooltip(event.trigger,messages[locale]['copy_success'])})
clipboard.on('error',event=>{temporarilyChangeTooltip(event.trigger,messages[locale]['copy_failure'])})}
runWhenDOMLoaded(addCopyButtonToCodeCells)