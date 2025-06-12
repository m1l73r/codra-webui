export interface NodeApi {
  build: () => string,
}

export interface Node {
  api?: (api: NodeApi) => void,
  id: string,
  kind: string,
  text: string,
  end_byte: number,
  start_byte: number,
  children: Node[],
}
