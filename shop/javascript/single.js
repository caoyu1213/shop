(function(){//������������
    var oSmallPic = document.getElementById("small-pic");
    var aSmallImgs = oSmallPic.getElementsByTagName("img");
    var oBigPic = document.getElementById("big-pic");
    var oBigImg = oBigPic.getElementsByTagName("img")[0];
    var oLeft = document.getElementById("left");
    var oRight = document.getElementById("right");
    var oSingle = document.getElementById("single");
    var oWrapper = oSingle.getElementsByClassName("wrapper")[0];//�м���������
    var nowIndex = 0;//����ĵ�ǰ��ʾ��ͼƬ������
    var oDrag = document.getElementById("drag");
    var oMagnify = document.getElementById("magnify");
    var oMask = document.getElementById("mask");
    var oMagnifyImg = oMagnify.getElementsByTagName("img")[0];
    for(var i=0; i<aSmallImgs.length; i++){
        aSmallImgs[i].index = i;//�Զ�������
        aSmallImgs[i].onclick = function(){
            nowIndex = this.index;
            changeImg();
        };
    }
    oLeft.onclick = oRight.onclick = function(){
        if(this === oRight){
            nowIndex++;//0 1 2 3
            if(nowIndex == aSmallImgs.length){
                nowIndex = 0;
            }
        }else{
            nowIndex--;
            if(nowIndex == -1){
                nowIndex = aSmallImgs.length - 1;
            }
        }
        changeImg();
    };

    function changeImg(){
        oBigImg.src = aSmallImgs[nowIndex].src;
        oMagnifyImg.src = aSmallImgs[nowIndex].src;
        for(var i=0; i<aSmallImgs.length; i++){
            aSmallImgs[i].className = "";
        }
        aSmallImgs[nowIndex].className = "selected";
        //СͼƬ�ƶ�
        var left = 0;
        if(nowIndex == 0){

            left = 0;

        }else{

            left = 1;

        }
        animate(aSmallImgs, {
            left: -(aSmallImgs[0].offsetWidth + 10) * left
        });
    }

    //�Ŵ�

 oMask.onmouseover = function(){
        oDrag.style.display = "block";
        oMagnify.style.display = "block";
    };
    oMask.onmouseout = function(){
        oDrag.style.display = "none";
        oMagnify.style.display = "none";
    };
    oMask.onmousemove = function(e){
        e = e || window.event;

        var left = e.pageX - oWrapper.offsetLeft - oDrag.offsetWidth / 2;
        var top = e.pageY - oSingle.offsetTop - oDrag.offsetHeight / 2;
        if(left <= 0){
            left = 0;
        }
        if(top <= 0){
            top = 0;
        }
        var maxRight = oBigPic.offsetWidth - oDrag.offsetWidth;
        if(left >= maxRight){
            left = maxRight;
        }
        var maxBottom = oBigPic.offsetHeight - oDrag.offsetHeight;
        if(top >= maxBottom){
            top = maxBottom
        }
        oDrag.style.left = left + "px";
        oDrag.style.top = top + "px";


        //�ұߴ�ͼƬ�ƶ�
        var scaleX = left / maxRight;
        var scaleY = top / maxBottom;
        oMagnifyImg.style.left = -scaleX * (oMagnifyImg.offsetWidth - oMagnify.offsetWidth) + "px";
        oMagnifyImg.style.top = -scaleY * (oMagnifyImg.offsetHeight - oMagnify.offsetHeight) + "px";
    };


})();

