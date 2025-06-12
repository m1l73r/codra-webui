// pub struct Package {
//     pub name: String,
//     pub owner: String,
//     #[serde(rename = "type")]
//     pub package_type: PackageType,
//     pub on_filetypes: Vec<String>,
//     pub root_markers: Vec<String>,
//     pub description: String,
//     pub versions: Vec<String>,
//     pub dependencies: Vec<Vec<String>>,
// }

export enum PackageType {
  WEBUI,
  LANGUAGE_PROFILE,
  PARSER,
  LSP,
}
export interface Package {
  name: string,
  owner: string,
  package_type: PackageType,
  on_filetypes: string[],
  root_markers: string[],
  description: string,
  versions: string[],
  dependencies: string[][],
}
