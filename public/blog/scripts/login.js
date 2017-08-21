/**
 * Created by Administrator on 2017/8/2.
 */
function verifyEmpty(str){
    var reg= /^\s*$/g;
    if(!str || reg.test(str)){
        return true;
    }
    return false;
}
window.onload=function(){
    var username_tips=document.getElementById('username_tips'),
        password_tips=document.getElementById('password_tips'),
        tips=document.getElementById('tips');

    var submitFn=function(){
        console.log("submitFn");
        username_tips.innerHTML='';
        password_tips.innerHTML='';
        tips.innerHTML='';
        var username=document.getElementById('username').value,
            password=document.getElementById('password').value;

        if(verifyEmpty(username)){
            return username_tips.innerHTML='帐号不能为空';
        }
        if(verifyEmpty(password)){
            return password_tips.innerHTML='密码不能为空';
        }

        window.http.post('/blog/auth',null,{'username': username, 'password':password},function(response){
            console.log("response : " + response.status);
            if(response.status === 200) return window.location.href='index.html';
            if(response.status === 400)
                return tips.innerHTML='用户名或密码错误';
            tips.innerHTML='网络错误';
        });
    };
    document.getElementById('submitBtn').onclick = submitFn;
    document.onkeydown = function(e){
        var event=e||window.event;
        if(event.keyCode === 13){
            submitFn();
        }
    };
};
