import React from "react";
// import { IoMdArrowDropright } from "react-icons/io";
// import TreeView, { flattenTree } from "react-accessible-treeview";
// import cx from "classnames";
import "./organizationTree.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callOrganizationTreeAPI } from "../../apis/OrganizationChartAPICalls";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import payCSS from "../../@core/css/pay.module.css";



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
  // const organizationTreeData = useSelector(state => state.organizationChartReducer);

  //데이터 잘 넘어왔는지 확인..
  // console.log(organizationTreeData);



//   const [treeViewData, setTreeViewData] = useState([]);

//   useEffect(()=>{
//     dispatch(callOrganizationTreeAPI());
//   }, []);

//   useEffect(() => {
//   if (organizationTreeData){
//     const convertedData = convertServerDataToTreeViewFormat(organizationTreeData);
//     // const dataForTreeView = flattenTree(convertedData);
//     setTreeViewData(convertedData);
//   }
// }, []);

// function convertServerDataToTreeViewFormat(data){
//   const convertMembersToChildren = (members) =>
//   members.map(member => ({
//     name: `${member.memName} ${member.posName}`
//   }));

//   const transformData = (node) => ({
//     name: node.depName,
//     children: [
//       ...(node.children || []).map(child => transformData(child)),
//       ...(node.memberList ? convertMembersToChildren(node.memberList) : [])
//     ]
//   });

//   return {
//     name: '전체',
//     children: [transformData(data)],
//   };
// }


const departmentList = useSelector((state) => state.organizationChartReducer);

useEffect(() => {
  dispatch(callOrganizationTreeAPI());
}, [dispatch]);


const nodes =
departmentList && departmentList.children
  ? [
      {
        value: departmentList.depName,
        label: departmentList.depName,
        expandDisabled: true,
        children: departmentList.children.map((dep) => ({
          value: dep.depName === "인사팀" ? dep.depName : dep.depName,
          label: dep.depName === "인사팀" ? dep.depName : dep.depName,
          children:
            dep.depName === "인사팀"
              ? dep.memberList.map((mem) => ({
                  value: mem.memCode,
                  label: mem.memName + " " + mem.posName,
                }))
              : dep.children.map((chi) => ({
                  value: chi.depCode,
                  label: chi.depName,
                  children: chi.memberList.map((mem) => ({
                    value: mem.memCode,
                    label: mem.memName + " " + mem.posName,
                  })),
                })),
        })),
      },
    ]
  : [];

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState(["동물원병원"]);
  const [searchQuery, setSearchQuery] = useState("");


  const onClickGetMemCode = (e) => {
    console.log(e);
  };

  const searchMethod = (node, searchQuery) =>
  node.label.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    // <div className="checkbox">
    //   <TreeView
    //     data={treeViewData}
    //     aria-label="Checkbox tree"
    //     nodeRenderer={({
    //       element,
    //       isBranch,
    //       isExpanded,
    //       getNodeProps,
    //       level,
    //       handleExpand,
    //     }) => {
    //       return (
    //         <div
    //           {...getNodeProps({ onClick: handleExpand })}
    //           style={{ marginLeft: 40 * (level - 1) }}
    //         >
    //           {isBranch && <ArrowIcon isOpen={isExpanded} />}
    //           {element.name}
    //         </div>
    //       );
    //     }}
    //   />
    // </div>
    <>
              <div className={`${payCSS["department"]}`}>
            <div className={`${payCSS["input-group5"]}`}>
            <h4 className='fw-bold py-3 mb-4'>
            <span className='text-muted fw-light'>부서 {'>'}</span> 조직도
            </h4>
              <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={setChecked}
                onExpand={setExpanded}
                onClick={onClickGetMemCode}
                icons={{
                  check: <span className="bx bx-checkbox-checked" />,
                  uncheck: <span className="bx bx-checkbox" />,
                  halfCheck: <span className="bx bx-checkbox-square" />,
                  expandClose: <span className="bx bx-chevron-right" />,
                  expandOpen: <span className="bx bx-chevron-down" />,
                  expandAll: <span className="rct-icon rct-icon-expand-all" />,
                  collapseAll: <span className="bx folder-open" />,
                  parentClose: <span className="bx bx-folder" />,
                  parentOpen: (
                    <span
                      className="bx bx-folder-open"
                      style={{ color: "#696cff" }}
                    />
                  ),
                  leaf: <span className="bx bx-user" />,
                }}
                searchQuery={searchQuery}
                searchMethod={searchMethod}
              />
            </div>
          </div>
    </>
  );
}

// const ArrowIcon = ({ isOpen }) => {
//   return <IoMdArrowDropright className={cx("arrow", { "arrow--open": isOpen, "arrow--closed": !isOpen })} />;
// };


export default OrganizationTree;