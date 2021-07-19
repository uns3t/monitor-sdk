import initPvMonitor from "./monitor/history";

initPvMonitor();
window.addHistoryListener('history',function(){
  console.log('窗口的history改变了');
})
