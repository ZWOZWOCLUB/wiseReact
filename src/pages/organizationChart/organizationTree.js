import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import "./organizationTree.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callOrganizationTreeAPI } from "../../apis/OrganizationChartAPICalls";


const serverData = {
  "depName": "최상위부서",
  "children": [
    {
      "depName": "인사팀",
      "children": [],
      "memberList": [
        {
          "memName": "직원1",
          "posName": "직위4"
        }
      ]
    },
    {
      "depName": "부서1",
      "children": [
        {
          "depName": "부서1의하위1",
          "children": [],
          "memberList": [
            {
              "memName": "직원5",
              "posName": "직위1"
            },
            {
              "memName": "직원6",
              "posName": "직위2"
            },
            {
              "memName": "직원7",
              "posName": "직위3"
            }
          ]
        }
      ]
    }
  ]
};







// 서버 데이터를 TreeView에서 사용할 수 있는 형태로 변환하는 함수
function convertServerDataToTreeViewFormat(data) {
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

  return transformData(data);
}

// 변환된 데이터를 TreeView에 사용
const convertedData = convertServerDataToTreeViewFormat(serverData);
const data = flattenTree(convertedData);

function MultiSelectCheckbox() {

  const dispatch = useDispatch();

  const organizationTreeData = useSelector(state => state.organizationChartReducer.data);

  console.log(organizationTreeData);

  useEffect(()=>{
    dispatch(callOrganizationTreeAPI());
  }, []);



  return (
    <div className="checkbox">
      <TreeView
        data={data}
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


export default MultiSelectCheckbox;