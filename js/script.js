var DropItem = function() {
    //アニメサイズ
    var anime_height =32;
    var anime_width = 32;
    //表示位置（絶対アドレス）
    var vertical_pos = 0;
    var horizontal_center_pos = 0;
    var horizontal_pos = 0;
    //移動速度(px)
    var speed = 0;
    //揺れ方
    var swing_width = 0;
    var swing_degree = 90;

    //再設定
    this.reset = function(w_height, w_width, w_margin) {
    
        //開始位置（絶対アドレス）
        vertical_pos = w_margin;
        horizontal_center_pos= Math.floor(Math.random()*(w_width-anime_width-w_margin*2))+w_margin;
        horizontal_pos = horizontal_center_pos;
        //移動速度(px):[1-10]
        speed = Math.floor(Math.random()*10)+1;
        //揺れ方速度の速いものは少なく、遅いものは大きく揺らす
        swing_width = 30 - speed*3;
        swing_degree = 0;
        return vertical_pos;
    }

     //落下処理
     this.fall = function(w_height) {
        if (vertical_pos < w_height) {
            vertical_pos += speed;
        }
        return vertical_pos;
     }

     //揺れ処理
     this.swing = function() {
       // horizontal_center_posを中心として左右に揺れる
       swing_direction = Math.sin(swing_degree/180*Math.PI);
       horizontal_pos = swing_direction * swing_width + horizontal_center_pos;
       swing_degree += 10;
       if (swing_degree >= 360) {
           swing_degree = 0;
       }
       return horizontal_pos;
     }

}





function fallingDrops() {
  //ウィンドウ
  var window = $("body");
  var w_height = window.height();
  var w_width = window.width();
  var w_margin = 10;
  //表示アイテム
  var num_items = 0;
  var max_items = 1;
  var Items = [];

  function moveAnime() {
    window = $("body");
    w_height = window.height();
    w_width = window.width();
        
    if (num_items < max_items) {
      var new_item = document.createElement('div');
      new_item.classList.add('drop');
      var parent = document.getElementById('anime');
      parent.appendChild(new_item);
      var new_drop = new DropItem();
      new_drop.reset(w_height, w_width, w_margin);
      Items.push(new_drop);
      num_items++;
    }
        
    $(".drop").each(function(index, elem) {
      var vpos = Items[index].fall(w_height);
      if (vpos > w_height) {
        vpos = Items[index].reset(w_height, w_width, w_margin);
      }
      $(elem).css("top", vpos+"px");
      $(elem).css("left", Items[index].swing()+"px");
    });
  };
  setInterval(moveAnime, 100);

}


