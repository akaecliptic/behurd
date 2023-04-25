export type FunctionalLayout<Parameter = {}> = ({ children, params }: { children: React.ReactNode, params: Parameter }) => JSX.Element;
export type ErrorSegment = ({ error, reset }: { error: Error, reset: () => void }) => JSX.Element;
export type DynamicSegment<Parameter> = ({ params }: { params: Parameter }) => JSX.Element;
export type SearchableSegment<Searchable, Parameter = {}> = ({ params, searchParams }: { params: Parameter, searchParams: Searchable }) => JSX.Element;
