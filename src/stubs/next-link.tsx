import React from 'react'

const Link: React.FC<{ href: string; className?: string; children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children, ...rest }) => (
  <a href={href} {...rest}>{children}</a>
)
export default Link
