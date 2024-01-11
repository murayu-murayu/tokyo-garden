import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  // 公式APIからデータ取得
  let apiData = null;
  if (post.apiEndpoint) {
    // エンドポイント・キー・バリューは個々の記事ファイルの設定エリアから取得
    const apiEndpointKewValue = `${post.apiEndpoint}?${post.apiKey}=${post.apiValue}`;
    const response = await (await fetch(apiEndpointKewValue)).json();
    apiData = response[0][0];
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      {/* 本文 */}
      <Mdx code={post.body.code} />

      <h3 className="mb-2">概要(公式情報より)</h3>
      {apiData["説明"]}

      {/* APIから取得した基本情報の表 */}
      <h3 className="mb-2">基本情報</h3>
      {{ apiData } && (
        <table className="table-fixed">
          <thead>
            <tr>
              <th>項目名</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>名称</td>
              <td>{apiData["名称"]["表記"]}</td>
            </tr>
            <tr>
              <td>公式サイト</td>
              <td>
                <a href={apiData["参照"][1]["参照先"]}>
                  {apiData["参照"][1]["参照先"]}
                </a>
              </td>
            </tr>
            <tr>
              <td>アクセス</td>
              <td>{apiData["アクセス"]["備考"]}</td>
            </tr>
            <tr>
              <td>住所</td>
              <td>
                {apiData["住所"]["郵便番号"]}
                {apiData["住所"]["表記"]}
              </td>
            </tr>
            <tr>
              <td>開園時間</td>
              <td>{apiData["利用可能時間"]["開始時間"]}</td>
            </tr>
            <tr>
              <td>閉園時間</td>
              <td>{apiData["利用可能時間"]["終了時間"]}</td>
            </tr>
            <tr>
              <td>曜日</td>
              <td>{apiData["利用可能時間"]["種別"]}</td>
            </tr>
            <tr>
              <td>備考</td>
              <td>{apiData["利用可能時間"]["説明"]}</td>
            </tr>
          </tbody>
        </table>
      )}
    </article>
  );
}
