import WhoWeAre from "@/components/index/sections/whoWeAre";
import OurMission from "@/components/index/sections/ourMission";
import ContactUs from "@/components/index/sections/contactUs";
import Advantages from "@/components/index/sections/advantages";
import Banner from "@/components/index/sections/banner";
import OurFactory from "@/components/index/sections/ourFactory";
import Certification from "@/components/index/sections/template02/certification";

export default function AboutTemplate({
                                          bannerData,
                                          aboutData,
                                          missionData,
                                          statsData,
                                          advantageData,
                                          companyImageData,
                                          certificationImageData,
                                          contactData
                                      }) {
    // 提供默认值以避免空指针错误
    const safeAboutData = aboutData || {};
    const safeMissionData = missionData || {};
    const safeStatsData = statsData || {};
    const safeAdvantageData = advantageData || [];
    const safeCompanyImageData = companyImageData || [];
    const safeCertificationImageData = certificationImageData || [];
    const safeContactData = contactData || {};
    const safeBannerData = bannerData || {};
    return (
        <div className="flex flex-col">
            <div className="w-full h-[200px]">
                <Banner title="About Us" bannerData={safeBannerData}/>
            </div>

            <div>
                {/* Who We Are 区域 */}
                <WhoWeAre aboutData={safeAboutData}/>

                {/*Our mission section */}
                <OurMission missionData={safeMissionData} statsData={safeStatsData}/>

                {/* Our Advantages 区域 */}
                {safeAdvantageData?.length > 0 && (
                    <Advantages advantageData={safeAdvantageData}/>
                )}

                {/* Our Factory 区域 */}
                {safeCompanyImageData?.length > 0 && (
                    <OurFactory companyImageData={safeCompanyImageData}/>
                )}

                {/* certification 区域 */}
                {safeCertificationImageData?.length > 0 && (
                    <Certification certificationImageData={safeCertificationImageData}/>
                )}

                <ContactUs contactData={safeContactData}/>
            </div>
        </div>
    );
}
