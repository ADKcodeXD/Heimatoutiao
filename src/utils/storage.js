// 用于进行本地存储的相关方法的封装。
export const getItem=(name)=>{
    const item=window.localStorage.getItem(name);
    try {
        // 尝试转换为对象返回
        return JSON.parse(item);
    } catch (error) {
        // 如果item不是对象，那就直接返回
        return item;
    }
}

export const setItem=(name,value)=>{
    if((typeof value)==="object"){
        window.localStorage.setItem(name,JSON.stringify(value));
    }else{
        window.localStorage.setItem(name,value)
    }
}

export const removeItem=(name)=>{
    window.localStorage.removeItem(name)
}