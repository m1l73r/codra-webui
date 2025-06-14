import { For, Show } from 'solid-js'
import * as StyledTreeView from './styled/tree-view'
import { Icon } from '@iconify-icon/solid'

export const TreeView = (props: StyledTreeView.RootProps) => {
  return (
    <StyledTreeView.Root {...props}>
      <StyledTreeView.Tree>
        <For each={props.collection.rootNode.children}>
          {(node, index) => <TreeNode node={node} indexPath={[index()]} />}
        </For>
      </StyledTreeView.Tree>
    </StyledTreeView.Root>
  )
}

const TreeNode = (props: StyledTreeView.NodeProviderProps) => {
  const { node, indexPath } = props
  return (
    <StyledTreeView.NodeProvider node={node} indexPath={indexPath}>
      <Show
        when={node.children}
        fallback={
          <StyledTreeView.Item>
            <StyledTreeView.ItemIndicator>
              <Icon icon={"streamline-flex-color:check-square-flat"} />
            </StyledTreeView.ItemIndicator>
            <StyledTreeView.ItemText>
              <Icon icon={"streamline-flex-color:file-code-1-flat"} />
              {node.name}
            </StyledTreeView.ItemText>
          </StyledTreeView.Item>
        }
      >
        <StyledTreeView.Branch>
          <StyledTreeView.BranchControl>
            <StyledTreeView.BranchText>
              <Icon icon={"flat-color-icons:folder"} /> {node.name}
            </StyledTreeView.BranchText>
            <StyledTreeView.BranchIndicator>
              <Icon icon={"fluent:chevron-right-12-filled"} />
            </StyledTreeView.BranchIndicator>
          </StyledTreeView.BranchControl>
          <StyledTreeView.BranchContent>
            <StyledTreeView.BranchIndentGuide />
            <For each={node.children}>
              {(child, index) => <TreeNode node={child} indexPath={[...indexPath, index()]} />}
            </For>
          </StyledTreeView.BranchContent>
        </StyledTreeView.Branch>
      </Show>
    </StyledTreeView.NodeProvider>
  )
}
