export function roll_back(commit_id: string): any {
  return {
    roll_back: {
      commit_id
    }
  }
}

export function commit(files: string[], message: string): any {
  return {
    commit: {
      files,
      message,
    }
  }
}

export interface CommitItem {
  id: string,
  message: string,
  files: string[],
}
