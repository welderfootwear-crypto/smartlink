import { NextResponse } from "next/server";

const links: Record<string, string> = {
  wa: "https://wa.me/6281234567890",
  toko: "https://tokopedia.com",
};

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const url = links[params.code];

  if (!url) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(url);
}
