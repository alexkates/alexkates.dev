"use client";

import Image from "next/image";

function ProjectList() {
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex items-center text-xl">
        <span className="font-medium">Work I&apos;m proud of</span>
      </div>
      <div className="">
        <Image src="/croissant-share.png" alt="Croissant Chrome Extension" width={1080} height={567} />
        <Image src="/fitgpt.png" alt="FitGPT" width={876} height={432} />
        <Image src="/supajournal.png" alt="Supajournal" width={1080} height={567} />
        <Image src="/teamgpt.png" alt="TeamGPT" width={876} height={438} />
      </div>
    </div>
  );
}

export default ProjectList;
