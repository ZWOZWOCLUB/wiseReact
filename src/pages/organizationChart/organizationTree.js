import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import "./organizationTree.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callOrganizationTreeAPI } from "../../apis/OrganizationChartAPICalls";


// const serverData = {
//   // "depName": "최상위부서",
//   // "children": [
//   //   {
//   //     "depName": "인사팀",
//   //     "children": [],
//   //     "memberList": [
//   //       {
//   //         "memName": "직원1",
//   //         "posName": "직위4"
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     "depName": "부서1",
//   //     "children": [
//   //       {
//   //         "depName": "부서1의하위1",
//   //         "children": [],
//   //         "memberList": [
//   //           {
//   //             "memName": "직원5",
//   //             "posName": "직위1"
//   //           },
//   //           {
//   //             "memName": "직원6",
//   //             "posName": "직위2"
//   //           },
//   //           {
//   //             "memName": "직원7",
//   //             "posName": "직위3"
//   //           }
//   //         ]
//   //       }
//   //     ]
//   //   }
//   // ]
// };







// // 서버 데이터를 TreeView에서 사용할 수 있는 형태로 변환하는 함수
// function convertServerDataToTreeViewFormat(data) {
//   const convertMembersToChildren = (members) =>
//     members.map(member => ({
//       name: `${member.memName} ${member.posName}`
//     }));

//   const transformData = (node) => ({
//     name: node.depName,
//     children: [
//       ...(node.children || []).map(child => transformData(child)),
//       ...(node.memberList ? convertMembersToChildren(node.memberList) : [])
//     ]
//   });

//   return transformData(data);
// }

// // 변환된 데이터를 TreeView에 사용
// const convertedData = convertServerDataToTreeViewFormat(serverData);
// const data = flattenTree(convertedData);

function OrganizationTree() {

  const dispatch = useDispatch();

  //useSelector 를 통해 스토어 조회. state.organizationChartReducer는 서버의 데이터
  const organizationTreeData = useSelector(state => state.organizationChartReducer);

  //데이터 잘 넘어왔는지 확인..
  console.log(organizationTreeData);

  const [treeViewData, setTreeViewData] = useState([]);

  useEffect(()=>{
    dispatch(callOrganizationTreeAPI());
  }, []);

  useEffect(() => {
  if (organizationTreeData){
    const convertedData = convertServerDataToTreeViewFormat(organizationTreeData);
    // const dataForTreeView = flattenTree(convertedData);
    setTreeViewData(convertedData);
  }
}, []);

function convertServerDataToTreeViewFormat(data){
  const convertMembersToChildren = (members) =>
  members.map(member => ({
    name: `${member.memName} ${member.posName}`
  }));

  const transformData = (node) => ({
    name: node.depName,
    children: [
      ...(node.children || []).map(child => transformData(child)),
      ...(node.memberList ? convertMembersToChildren(node.memberList) : [])
    ]
  });

  return {
    name: '전체',
    children: [transformData(data)],
  };
}

  return (
    <div className="checkbox">
      <TreeView
        data={treeViewData}
        aria-label="Checkbox tree"
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          getNodeProps,
          level,
          handleExpand,
        }) => {
          return (
            <div
              {...getNodeProps({ onClick: handleExpand })}
              style={{ marginLeft: 40 * (level - 1) }}
            >
              {isBranch && <ArrowIcon isOpen={isExpanded} />}
              {element.name}
            </div>
          );
        }}
      />
    </div>
  );
}

const ArrowIcon = ({ isOpen }) => {
  return <IoMdArrowDropright className={cx("arrow", { "arrow--open": isOpen, "arrow--closed": !isOpen })} />;
};


export default OrganizationTree;