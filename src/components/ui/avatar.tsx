import Image from "next/image";

import type { ComponentProps } from "react";

export function Avatar(props: ComponentProps<typeof Image>) {
  return <Image width={40} height={40} className="rounded-full" alt="" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />

  // return <Image width={40} height={40} className="rounded-full" {...props} />
}