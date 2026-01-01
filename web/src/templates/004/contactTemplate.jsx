import GetInTouch from "@/components/index/sections/template04/getInTouch";
import Banner from "@/components/index/sections/bannerB";
import RecommendedForYou from "@/components/index/sections/template04/recommendedForYou";

export default function ContactTemplate({bannerData, contactData, recommendData}){
    // 提供默认值以避免空指针错误
    const safeBannerData = bannerData || {};
    const safeContactData = contactData || {};
    const safeRecommendData = recommendData || [];
    return (
        <div className="flex flex-col">
            <Banner title="Contact Us" titleLink="/contact" bannerData={safeBannerData}/>

            <GetInTouch contactData={safeContactData}/>

            {/*分割线*/}
            <div className="w-full py-4 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-[2px] w-full bg-gradient-to-r from-mainColorNormal via-blue-400 to-purple-500" style={{ backgroundSize: '10px 2px', backgroundImage: 'linear-gradient(to right, transparent 50%, currentColor 50%)', backgroundRepeat: 'repeat-x', opacity: 0.3 }}></div>
                </div>
            </div>


            {
                safeRecommendData?.length > 0 && (
                    <RecommendedForYou recommendData={safeRecommendData}/>
                )
            }

        </div>
    );
}