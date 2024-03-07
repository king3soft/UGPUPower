import "../index.css";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types"

const ColorMap = {
  info: '#1677FF',
  success: '#52C41A',
  warning: '#FAAD14',
  error: '#FF4D4F',
}

const ConsoleCard = (props) => {
  const { focus$ } = props;
  const contentRef = useRef(null);
  const [consoleList, setConsoleList] = useState([]);

  // 监听数据添加
  focus$.useSubscription((data) => {
    if (typeof data.message !== 'string') {
      data.message = JSON.stringify(data.message);
    }
    if (data.message.toLocaleLowerCase().includes('succeed')) {
      data.type = 'success';
    }
    
    if (data.message.toLocaleLowerCase().includes('error')) {
      data.type = 'error';
    }
    setConsoleList([...consoleList, data]);
  })

  useEffect(() => {
    if (contentRef.current && consoleList.length > 0) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [contentRef, consoleList])

  return (
    <div className="consoleContent" ref={contentRef}>
      {
        consoleList.map((item, index) => (
          <div key={`${item}${index}`} style={{color: ColorMap?.[item.type] || '#fff'}} className="consoleItem" dangerouslySetInnerHTML={{ __html: item.message }}></div>
        ))
      }
    </div>
  );
};

ConsoleCard.propTypes = {
  focus$: PropTypes.any
}

export default ConsoleCard;
