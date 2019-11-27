// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as input from './input';
import * as js from './javascript';

type Boxed<Args extends any[], Handle> = { [Index in keyof Args]: Args[Index] | Handle };
type PageFunction<Args extends any[], R = any> = string | ((...args: Args) => R | Promise<R>);
type PageFunctionOn<On, Args extends any[], R = any> = string | ((on: On, ...args: Args) => R | Promise<R>);

export type Evaluate<Handle> = <Args extends any[], R>(pageFunction: PageFunction<Args, R>, ...args: Boxed<Args, Handle>) => Promise<R>;
export type EvaluateHandle<Handle> = <Args extends any[]>(pageFunction: PageFunction<Args>, ...args: Boxed<Args, Handle>) => Promise<Handle>;
export type $Eval<Handle> = <Args extends any[], R>(selector: string, pageFunction: PageFunctionOn<Element, Args, R>, ...args: Boxed<Args, Handle>) => Promise<R>;
export type $$Eval<Handle> = <Args extends any[], R>(selector: string, pageFunction: PageFunctionOn<Element[], Args, R>, ...args: Boxed<Args, Handle>) => Promise<R>;
export type EvaluateOn<Handle> = <Args extends any[], R>(pageFunction: PageFunctionOn<any, Args, R>, ...args: Boxed<Args, Handle>) => Promise<R>;
export type EvaluateHandleOn<Handle> = <Args extends any[]>(pageFunction: PageFunctionOn<any, Args>, ...args: Boxed<Args, Handle>) => Promise<Handle>;

export interface ElementHandle<EHandle extends ElementHandle<EHandle>> extends js.JSHandle<EHandle> {
  $(selector: string): Promise<EHandle | null>;
  $x(expression: string): Promise<EHandle[]>;
  $$(selector: string): Promise<EHandle[]>;
  $eval: $Eval<js.JSHandle<EHandle>>;
  $$eval: $$Eval<js.JSHandle<EHandle>>;
  click(options?: input.ClickOptions): Promise<void>;
  dblclick(options?: input.MultiClickOptions): Promise<void>;
  tripleclick(options?: input.MultiClickOptions): Promise<void>;
  fill(value: string): Promise<void>;
  focus(): Promise<void>;
  hover(options?: input.PointerActionOptions): Promise<void>;
  select(...values: (string | EHandle | input.SelectOption)[]): Promise<string[]>;
  type(text: string, options: { delay: (number | undefined); } | undefined): Promise<void>;
}