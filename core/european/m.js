/*

  转发抽奖工具

*/
var europeanSet = {
  loopNumOnload: 0,
  loopNumOnloadMax: 20,
  timerOnload: null,
  cardW: 0,
  loopNum: 0,
  timer: null,
  timerOff: false,
  userArr: [],
  userArr2: [],
  userAtArr: [],
  addUser: [],
  winArr: [],
  card: null,
  winnerNum: 0,
  upName: null,
  start: true,
  autoLoadOffset: 0,
  autoLoadTimer: null,
  autoLoadNum: 0,
  autoLoadMax: 20,
  Alleuropeans: 0,
  defaultAtNum: 0,
  mod: true,
  atNumArr: [],
  atNumReg: /<?a href="\/\/space\.bilibili\.com\/\d+\/dynamic"[^<>]*>\@([^<>@]*)<\/a>/ig
}

chrome = chrome || browser;

$(document).ready(function() {

});

europeanSet.timerOnload = setInterval(function(){
  if($('.detail-card .card:eq(0)').length > 0) {
    europeanSet.cardW = $('.detail-card .card:eq(0)').outerWidth();
    if($('.content').children('.card').length === 0) europeanShow();

    europeanSet.upName = $('.main-content:eq(0) .user-name:eq(0) a.c-pointer').text();
    europeanSet.Alleuropeans = Number($('.button-bar span:eq(0) span:eq(0)').text());

    clearInterval(europeanSet.timerOnload);
  } else {
    europeanSet.loopNumOnload++;
  }

  if(europeanSet.loopNumOnload > europeanSet.loopNumOnloadMax) clearInterval(europeanSet.timerOnload);
}, 500);

function europeanShow()
{
  var europeanShowHTML =
    '<div id="europeanPage">'+
      '<a href="javascript:void(0);" class="BtoolsLogoBtn">' + Btools.logo() + '</a>'+
      '<div class="europeanStartPage">'+
        '<p class="europeanUserArrLength">人数：<span>--</span></p>'+
        '<p class="europeanBtn">'+
          '<a id="europeanStartBtn" href="javascript:void(0);">开始</a>'+
          '<a id="europeanThisShitBtn" href="javascript:void(0);">就四李啦！</a>'+
          '<a id="europeanEndBtn" href="javascript:void(0);">结束抽奖</a>'+
        '</p>'+
        '<p class="europeanAutoLoadProgressBar"></p>'+
        '<div id="europeanUserArr"><p class="europeanUser"></p></div>'+
        '<div class="europeanWinners"></div>'+
        '<p class="europeanAtSet"><input type="number" value="0"></p>'+
        '<p class="europeanAddUser"><input type="text" placeholder="手动添加"><a href="javascript:void(0);">添加</a></p>'+
        '<div class="europeanAddUserArr"></div>'+
      '</div>'+
      '<div class="europeanPageBG"></div>'
    '</div>';

  $('body').append(europeanShowHTML);

  rePosition();
  $(window).resize(function() {
    rePosition();
  });

  $('.BtoolsLogoBtn').HKM([
    {
      key: 82,
      title: '转发抽奖',
      action: function() {
        if($('.europeanStartPage').is(':hidden')) {
          $('.europeanStartPage,.europeanPageBG').show().css({
            'width': $(window).width(),
            'height': $(window).height()
          });

          if(europeanSet.userArr.length !== 0) return false;
          if(europeanSet.autoLoadTimer === null) {
            var stopLoadding = !europeanSet.mod ? '<a class="europeanStopLoadding" href="javascript:void(0);">停止加载</a>' : '';
            $('#europeanUserArr .europeanUser').html('<font class="europeanUserMsg">正在加载</font>' + stopLoadding);
            $('.europeanStopLoadding').click(function() {
              domModAddUser();
              $('#europeanUserArr .europeanUser').html('');
              clearInterval(europeanSet.autoLoadTimer);
              europeanSet.autoLoadTimer = null;
              btnCtrl(true);
            });

            europeanSet.autoLoadTimer = setInterval(function(){
              autoLoad();
              europeanSet.autoLoadNum++;

              if(europeanSet.mod && europeanSet.autoLoadNum >= europeanSet.autoLoadMax) {
                $('#europeanUserArr .europeanUser').html('');
                clearInterval(europeanSet.autoLoadTimer);
                europeanSet.autoLoadTimer = null;
                btnCtrl(true);
              }
            }, 500);
          }
        } else {
          $('.europeanStartPage,.europeanPageBG').hide();
        }

      }
    }
  ]);

  chrome.storage.sync.get({defaultAtNum: 0}, function(items) {
    europeanSet.defaultAtNum = items.defaultAtNum;
    $('.europeanAtSet input').val(items.defaultAtNum);
  });

  $('.europeanAtSet input').bind('input propertychange', function(){
    var num = $(this).val();
    if(num >= 0 && num <= 9) {
      europeanSet.defaultAtNum = num;
    } else {
      $(this).val(europeanSet.defaultAtNum);
      return false;
    }
    $(this).val(europeanSet.defaultAtNum);
    chrome.storage.sync.set({defaultAtNum: europeanSet.defaultAtNum}, function() {
    });
  });

  $('.europeanAddUser a').click(function(){
    if($('.europeanAddUser input').val() === '') return false;
    var addUserName = $('.europeanAddUser input').val();
    var uData = {
      uID: null,
  		uName: addUserName,
  		uFace: 'http://static.hdslb.com/images/member/noface.gif',
  		uSpace: 'javascript:;',
      uMsg: 'https://search.bilibili.com/upuser?keyword=' + addUserName
  	};
    if(addUserArrFunc('isAdd', addUserName)){
      europeanSet.addUser = uniqueArr(uData, europeanSet.addUser, true);
      $('.europeanAddUser input').val('');
      $('.europeanAddUserArr').append('<a href="javascript:void(0);">' + addUserName + '</a>');
    }

  });

  $('.europeanAddUser input').keydown(function(e){
    if(e.which === 13) $('.europeanAddUser a').click();
  });

  $('.europeanAddUserArr').on('click', 'a', function(){
    addUserArrFunc('del', $(this).text());
    $(this).remove();
  });

  $('#europeanStartBtn').click(function(){
    if(europeanSet.start) return false;
    btnCtrl(false);
    $('.europeanAddUserArr').hide();

    addUserInArr(europeanSet.addUser);

    if(europeanSet.defaultAtNum === 0) {
      europeanSet.userAtArr = europeanSet.userArr;
    } else {
      europeanSet.userArr.forEach(function(item, index) {
        if(europeanSet.mod) {
          if(item.uAt >= europeanSet.defaultAtNum) {
            europeanSet.userAtArr.push(item);
          }
        } else {
          if(europeanIsAt(item.uCom)) {
            europeanSet.userAtArr.push(item);
          }
        }
      });
    }

    if(europeanSet.userAtArr.length === 0) {
      $('#europeanEndBtn').click();
      $('#europeanUserArr .europeanUser').html('<font class="europeanUserMsg">没有符合的用户</font>');
      return false;
    }

    europeanSet.timer = setInterval(function(){
      var user = europeanSet.userAtArr[europeanSet.loopNum];

      resetLoopNum();

      if(user === undefined) return;

      var europeanUserHTML = '<span style="background:transparent url(\'' + user.uFace + '\') no-repeat scroll 0 0 / 30px 30px;"></span><a class="europeanUName" href="javascript:void(0);">' + user.uName + '</a>';
      $('#europeanUserArr .europeanUser').html(europeanUserHTML);
      $('.europeanUserArrLength span').text(europeanSet.userAtArr.length);

      if(europeanSet.userAtArr.length === 1) {
        clearInterval(europeanSet.timer);
      }
    }, 100);
  });

  $('#europeanThisShitBtn').click(function(){
    if(!europeanSet.start || europeanSet.userAtArr.length === 0) return false;
    if(europeanSet.userAtArr.length === 1) {
      var lastUser = europeanSet.userAtArr[0];
      europeanSet.winArr.push(lastUser);
      europeanSet.userAtArr = [];
      $('.europeanUserArrLength span').text('0');
      if($('#europeanUserArr .europeanUser:first').css('top') == '0px') {
        var sTop = $('.europeanWinners').scrollTop();
        $('#europeanUserArr .europeanUser:first').animate({'top':$('.europeanWinners .europeanUser').length * 50 - sTop + 80}, function(){
          $('.europeanWinners').append(makeUserHTML(lastUser));
          $('.europeanWinners .europeanUser:last').css({
            'top': 50 * europeanSet.winnerNum
          });
          europeanSet.winnerNum++;
          $('.europeanWinners').scrollTop(europeanSet.winnerNum * 50);

          $(this).html('').css({'top':0});

          $('#europeanEndBtn').click();

        });
      }
      return false;
    }
    var rand = Math.round(Math.random() * (europeanSet.userAtArr.length - 1));
		var winU = europeanSet.userAtArr[rand];
		europeanSet.winArr.push(winU);
		europeanSet.userArr2 = [];
		$.each(europeanSet.userAtArr, function(k, v) {
			if (v.uName != winU.uName) {
				europeanSet.userArr2.push(v)
			}
		});
		europeanSet.userAtArr = europeanSet.userArr2;
    resetLoopNum();
    $('.europeanWinners').append(makeUserHTML(winU));
    $('.europeanWinners .europeanUser:last').css({
      'top': 50 * europeanSet.winnerNum
    });
    $('.europeanWinners').scrollTop(europeanSet.winnerNum * 50);
    europeanSet.winnerNum++;
  });

  $('#europeanEndBtn').click(function(){
    if(!europeanSet.start || europeanSet.autoLoadTimer !== null) return false;
    europeanSet.userAtArr = [];
    btnCtrl(true);

    $('.europeanAddUserArr').show();

    $('.europeanUserArrLength span').text('--');
    $('#europeanUserArr .europeanUser').html('');

    makeCSV();

    clearInterval(europeanSet.timer);
  });
}

function rePosition()
{
  var BtoolsBtnTop = $(window).height() * 0.3;
  var BtoolsBtnLeft = ($(window).width() / 2) - (europeanSet.cardW / 2) - 70;

  $('.BtoolsLogoBtn').css({
    'top': BtoolsBtnTop,
    'left': BtoolsBtnLeft
  });
  $('.europeanAtSet').css({
    'top': BtoolsBtnTop + 120,
    'left': BtoolsBtnLeft + 5
  });
  $('.europeanAddUser').css({
    'top': BtoolsBtnTop + 170,
    'left': BtoolsBtnLeft + 5
  });
  $('.europeanAddUserArr').css({
    'top': BtoolsBtnTop + 220,
    'left': BtoolsBtnLeft + 5
  });
}

function resetLoopNum()
{
  if(europeanSet.loopNum < europeanSet.userAtArr.length - 1) {
    europeanSet.loopNum++;
  } else {
    europeanSet.loopNum = 0;
  }
}

function autoLoad() {
  if(!europeanSet.mod) {
    var loadNum = Math.floor($('.forw-list .dynamic-list-item-wrap').length);
    var progressBarNum = loadNum / europeanSet.Alleuropeans * 100;
    $('.europeanAutoLoadProgressBar').css({'width': progressBarNum + '%'});

    if($('.forw-more .nomore').length !== 0) {
      if($('.forw-list .dynamic-list-item-wrap').length !== europeanSet.Alleuropeans) {
        $('#europeanUserArr .europeanUser').html('<font class="europeanUserMsg">到达加载极限，未全部加载完成</font>');
      } else {
        $('#europeanUserArr .europeanUser').html('<font class="europeanUserMsg">加载完成！</font>');
      }
      $('.europeanAutoLoadProgressBar').css({'width': '100%'});
      $('html,body').scrollTop('0');
      btnCtrl(true);

      domModAddUser();

      clearInterval(europeanSet.autoLoadTimer);
      europeanSet.autoLoadTimer = null;
    } else {
      if($('.more').length > 0) $('.more')[0].click();
      if(progressBarNum === 100) {
        $('.europeanStopLoadding').show();
      }
    }

    return false;
  }
  var dynamic_id = /t\.bilibili\.com\/(\d+)\??/i.exec(window.location.href)[1];
  var url = 'https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/view_repost?dynamic_id=' + dynamic_id + '&offset=' + europeanSet.autoLoadOffset;

  chrome.runtime.sendMessage({
    type: 'fetch',
    url: url
  },
  function(json) {
    if(json === null) {
      if(europeanSet.autoLoadNum / europeanSet.autoLoadMax < 0.5) {
          $('#europeanUserArr .europeanUser').html('<font class="europeanUserMsg">网络请求失败 重试 ' + europeanSet.autoLoadNum + '，请稍等</font>');
        } else {
          europeanSet.mod = false;
          europeanSet.userAtArr = [];
          $('#europeanUserArr .europeanUser').html('<font class="europeanUserMsg">模式切换，正在从前台页面获取数据</font>');
        }
      return false;
    }

    if(json.code === 0) {
      if(europeanSet.autoLoadOffset === 0) {
        europeanSet.autoLoadMax = json.data.total_count / 20 * 2;
        europeanSet.Alleuropeans = json.data.total_count;
      }

      $('.europeanAutoLoadProgressBar').css({
        'width': (europeanSet.autoLoadNum / europeanSet.autoLoadMax) * 100 + '%'
      });

      var com = json.data.comments;
      if(com.length > 0) {
        json.data.comments.forEach(function(item, index) {
          var atNum = 0;
          var atArr = item.ctrl.match(/"data":"\d+","length":\d+,"location":\d+,"type":\d+/g);
          var uCom = item.comment.split('//@')[0];

          if(uCom !== '' && atArr !== null) {
            atArr.forEach(function(v, k) {
              var comReg = /"location":(\d+)/.exec(v);
              var imgRex = /\[.*\]/.exec(uCom);
              var imgNum = imgRex !== null ? imgRex.length * 3 : 0;
              if(comReg.length > 1 && uCom.length - imgNum >= Number(comReg[1])) {
                atNum++;
              }
            });
          }

          var uData = {
            uID: item.uid,
            uName: item.uname,
            uFace: item.face_url,
            uAt: atNum,
            uSpace: 'https://space.bilibili.com/' + item.uid,
            uMsg: 'https://message.bilibili.com/#/whisper/mid' + item.uid
          };
          europeanSet.userArr = uniqueArr(uData, europeanSet.userArr, true);
          $('body').append('<img class="european-read-face" style="width:0" src="' + uData.uFace + '">');
        });
      } else {
        return false;
      }

      if(com.length > 0) {
        europeanSet.autoLoadOffset += com.length;
      }
    }
  });
}

function makeUserHTML(u)
{
  if(u.uSpace === 'javascript:;') {
    var btnText = '搜索TA';
  } else {
    var btnText = '私信TA';
  }
  return '<p class="europeanUser"><span style="background:transparent url(\'' + u.uFace + '\') no-repeat scroll 0 0 / 30px 30px;"></span><a class="europeanUName" href="' + u.uSpace + '" target="_blank">' + u.uName + '</a><a class="europeanUMsg" href="' + u.uMsg + '" target="_blank">' + btnText + '</a></p>';
}

function addUserArrFunc(key, uName)
{
  switch(key){
    case 'isAdd':
      if(uName === europeanSet.upName) return false;
      if(europeanSet.addUser.length === 0) return true;
      var isAdd = true;
      $.each(europeanSet.addUser, function(k, v){
        if(v.uName === uName){
          isAdd = false;
          return true;
        }
      });
      return isAdd;
    break;
    case 'del':
      if(europeanSet.addUser.length === 0) return false;
      var addUserArr2 = [];
      $.each(europeanSet.addUser, function(k, v){
        if(v.uName !== uName) addUserArr2.push(v);
      });
      europeanSet.addUser = addUserArr2;
    break;
  }
}

function uniqueArr(val, arr, isObj)
{
  if(arr.length === 0) {
    var un1 = isObj ? val.uName : val;
    if (un1 !== europeanSet.upName) arr.push(val);
  } else {
    var isAdd = true;
    $.each(arr, function(k, v){
      var un1 = isObj ? val.uName : val;
      var un2 = isObj ? v.uName : v;
      if (un1 === un2 || un1 === europeanSet.upName) {
        isAdd = false;
        return false;
      }
    });
    if(isAdd) {
      arr.push(val);
    }
  }
  return arr;
}

function addUserInArr(addUser)
{
  if(addUser.length > 0) {
    $.each(addUser, function(k, v){
      europeanSet.userAtArr = uniqueArr(v, europeanSet.userAtArr, true);
    });
  }
}

function europeanIsAt(com) {
  var uTextArr = com.split('//<');
  europeanSet.atNumArr = [];
  if(uTextArr.length > 1) {
    var text = uTextArr[0];
  } else {
    var text = uTextArr[0];
  }
  var reg = europeanSet.atNumReg;
  while(atNumArr = reg.exec(text)) {
    if(atNumArr.length > 1) {
      europeanSet.atNumArr = uniqueArr(atNumArr[1], europeanSet.atNumArr, false)
    } else {
      break;
    }
  }

  if(europeanSet.atNumArr.length < europeanSet.defaultAtNum) return false;

  return true;
}

function makeCSV()
{
  if(europeanSet.winArr.length === 0) return false;
  var downloadBtn = '<p class="europeanUser"><span style="border-radius:0;" class="europeanExcelIcon"></span><a class="europeanUName" href="javascript:void(0);">中奖名单已保存到CSV表格</a><a id="europeanExcelDownload" class="europeanUMsg" href="javascript:void(0);" target="_blank">下载TA</a></p>';
  var data =
    '\ufeff' +
    '抽奖动态：' + window.location.href + '\n' +
    'UP主：' + europeanSet.upName + ' 的抽奖\n' +
    '排序,用户ID,用户名,空间链接,联系\n';
  $.each(europeanSet.winArr, function(k, v){
    if(v.uID === null) {
      var uID = '无(手动添加)';
      var spaceText = '无(手动添加)';
    } else {
      var uID = v.uID;
      var spaceText = v.uSpace;
    }
    data += (k+1) + ',' + uID + ',' + v.uName + ',' + spaceText + ',' + v.uMsg + '\n';
  });

  $('#europeanUserArr .europeanUser').html(downloadBtn);

  var blob = new Blob([data], { type: 'text/csv,charset=UTF-8'});
  var a = document.getElementById('europeanExcelDownload');

  a.href = URL.createObjectURL(blob);

  a.download = europeanSet.upName + ' 的抽奖中奖名单.csv';
}

function btnCtrl(start)
{
  var startColor = start ? 'ff94b1' : '666';
  var stopColor = !start ? 'ff94b1' : '666';
  $('#europeanStartBtn').css({
    'background-color': '#' + startColor
  });
  $('#europeanThisShitBtn').css({
    'background-color': '#' + stopColor
  });
  $('#europeanEndBtn').css({
    'background-color': '#' + stopColor
  });
  europeanSet.start = !start;
}

function domModAddUser() {
  $('.forw-list .dynamic-list-item-wrap').each(function() {
    var userMid = /com\/(\d*)\//g.exec($(this).find('.forw-face:eq(0) .c-pointer:eq(0)').attr('href'))[1];
    var uData = {
      uID: null,
      uName: $(this).find('.item-detail:eq(0) .item-user:eq(0) a.user-name:eq(0)').text(),
      uFace: $(this).find('.forw-face:eq(0) .c-pointer:eq(0) .forw-head:eq(0)').attr('src'),
      uSpace: 'https://space.bilibili.com/' + userMid,
      uMsg: 'https://message.bilibili.com/#/whisper/mid' + userMid,
      uCom: $(this).find('.item-detail:eq(0) .text:eq(0)').html()
    };
    europeanSet.userArr = uniqueArr(uData, europeanSet.userArr, true);
  });
}
