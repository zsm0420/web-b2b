import Banner from "@/components/index/sections/bannerB";
import WhoWeAre from "@/components/index/sections/template04/whoWeAre";
import OurMission from "@/components/index/sections/template04/ourMission";
import Advantages from "@/components/index/sections/template04/advantages";
import OurFactory from "@/components/index/sections/template04/ourFactory";
import ContactUs from "@/components/index/sections/template04/contactUs";
import Certification from "@/components/index/sections/template04/certification";

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
    return (
        <div className="flex flex-col">

            <Banner title="About Us" titleLink="/about" bannerData={bannerData || {}}/>

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
