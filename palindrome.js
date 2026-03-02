let num=121
let temp=num;
let rev=0;
function factorial(){
    
}
function palindrome(){
while(num!=0){
    rev=rev*10+(num%10)
    num=Math.floor(num/10)
}
if(temp==rev){
    console.log("it is palindrome")

}
else{
    console.log("it is not a palindrome")
}
}
palindrome()

