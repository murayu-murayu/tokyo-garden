import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <hr className="my-4" />
      <h3 className="mb-2">本サイトについて</h3>
      <br />
      東京には、大都市ならではの現代的な景観だけでなく、その豊かな歴史を背景に、数多くの魅力的な庭園が存在しています。
      <br />
      これらの庭園は四季の移ろいと共に異なる美しさを見せ、訪れる人々に都会の喧騒から離れた穏やかな癒やしを与えています。
      自然と伝統が融合したこれらの場所では、時間がゆっくり流れるかのような、静謐なひとときを過ごすことができます。
      <br />
      このサイトでは、東京にひっそりと佇む美しい庭園の数々を紹介します。
    </div>
  );
}
