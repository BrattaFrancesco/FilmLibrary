function cutString(str){
    if(str.lenght < 2){
        return "";
    }else{
        return str.substring(0, 2) + str.substring(str.length-2, str.length);
    }
}

const words = ["computer", "a", "end", "so", "film", "library"];
console.log("Starting words set:", words);

console.log("Cut words set");
for(let i = 0; i < words.length; i++){
    let cutWord = cutString(words[i]);
    console.log(cutWord);
}