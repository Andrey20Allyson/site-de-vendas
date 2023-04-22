import React from 'react';
import './index.css';
import { FlexibleLayout, LayoutProps } from '../lib/base';

export default function Layout(props: LayoutProps) {
  return <FlexibleLayout Default={Default} Pocket={Pocket} {...props} />
}

export function Default({ }: {}) {
  return (
    <>
    </>
  );
}

export function Pocket({ }: {}) {
  return (
    <>
    </>
  );
}