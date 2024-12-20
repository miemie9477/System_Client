import "./css/IntroPage.css"
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const IntroBody = () => {

    return(
        <>
            <div style={{backgroundColor:"#FBD5A0"}}>
                <div className="IntroBody">
                    <div className="IBTitle">店家簡介</div>
                    <div className="IBLine"></div>
                    <div className="IBContent">歡迎來到【就是炸 炸物專賣店】！！！<br/><br/>
                        我們堅持用最好的食材和最純粹的熱情，為您呈現外酥內嫩、令人回味無窮的炸物盛宴。<br/>
                        控溫的黃金炸製工藝，讓每一口都穿著迷人的酥脆香氣<br/><br/>
                        無論您是偏愛鹹香的經典鹽酥雞，還是喜歡香嫩多汁的炸雞腿，<br/>
                        又或者是對炸甜不辣和酥炸洋蔥圈情有獨鍾，我們都滿足您的味蕾。<br/>
                        當然也定期推出促銷活動，如折價券或套餐的搭配，讓您每次光臨都有全新的驚喜與體驗！<br/><br/>
                        這裡不只是一間炸物店，更是與家人朋友分享美味與歡笑的好地方，您心中的美食記憶！<br/><br/>
                        店家地址:  高雄市苓雅區永昌街66號<br/>
                        聯絡電話:  0958310393<br/>
                        營業時間:  週一至週五 10:30~18:30<br/>
                    </div>
                </div>
                
            </div>
            <div className="IntroMap">
                <iframe className="IMGoogleMap" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3683.007112000539!2d120.2953379!3d22.6162096!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e037f1980568b%3A0xbf12f38e696b456f!2z5bCx5piv54K4IOeCuOeJqeWwiOizo-W6lw!5e0!3m2!1szh-TW!2stw!4v1734527712527!5m2!1szh-TW!2stw" 
                            style={{border:"0", width: "100%",aspectRatio: "2.95",}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div className="IMGoToMap"><a href="https://maps.app.goo.gl/Tkt6nYFaDMQZ5Fi1A">前往 Google Map 查看【就是炸 炸物專賣店】<IoArrowForwardCircleSharp  style={{fontSize:"1.5vw"}}/></a></div>          
            </div>
        </>
        

    );
}
  

export default IntroBody