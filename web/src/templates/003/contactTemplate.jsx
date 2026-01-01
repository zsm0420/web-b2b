
import RecommendedForYou from "@/components/index/sections/recommendedForYou";
import Banner from "@/components/index/sections/banner";
import GetInTouch from "@/components/index/sections/template03/getInTouch";

export default function ContactTemplate({bannerData, contactData, recommendData}){
    // 提供默认值以避免空指针错误
    const safeBannerData = bannerData || {};
    const safeContactData = contactData || {};
    const safeRecommendData = recommendData || [];
    return (
        <div className="flex flex-col">
            <div className="w-full h-[200px]">
                <Banner title="Contact Us" bannerData={safeBannerData}/>
            </div>

            <GetInTouch contactData={safeContactData}/>

            {
                safeRecommendData?.length > 0 && (
                    <RecommendedForYou recommendData={safeRecommendData}/>
                )
            }

        </div>
    );
}