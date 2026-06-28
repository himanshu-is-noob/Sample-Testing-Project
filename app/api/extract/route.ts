export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfParser = new PDFParser();

    const text: string = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (err: any) => reject(err));

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        let fullText = "";

        pdfData.Pages.forEach((page: any) => {
          page.Texts.forEach((textItem: any) => {
            textItem.R.forEach((r: any) => {
              fullText += decodeURIComponent(r.T) + " ";
            });
          });
        });

        resolve(fullText);
      });

      pdfParser.parseBuffer(buffer);
    });

    return NextResponse.json({ text });

  } catch (error) {
    console.error("PDF Extraction Error:", error);
    return NextResponse.json(
      { error: "Failed to extract PDF text" },
      { status: 500 }
    );
  }
}