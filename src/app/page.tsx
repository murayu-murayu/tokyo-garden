import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-6 prose max-w-6xl dark:prose-invert">
      東京の街中にひっそりと佇む、自然と伝統の融合した美しい庭園を紹介します。
      <br />
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
            {post.description && <p>{post.description}</p>}
            <div className="group item">
              {/* <!-- Desktop Image --> */}
              <div className="hidden w-full duration-200 md:block group-hover:scale-110">
                <Image
                  src={`/images/desktop/${post.image}`}
                  alt={post.title}
                  width={1024}
                  height={576}
                />
              </div>
              {/* <!-- Mobile Image --> */}
              <div className="w-full md:hidden">
                <Image
                  src={`/images/mobile/${post.image}`}
                  alt={post.title}
                  width={1024}
                  height={576}
                />
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
