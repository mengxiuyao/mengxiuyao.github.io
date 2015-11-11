面试时遇到一个问题：对一个ul下边的li进行倒序排列。

######当时我是直接获取到ul的chilNodes属性，然后对这个类数组进行倒序遍历push进列另外一个数组，最后失败了。因为li标签之间换行创建了text节点，不是纯粹的li标签的样式之后看书找到了一个方法：
    function reverseChildNodes(n) {
        //其中DocumentFragment是一个特殊的Node，它作为其他节点的一个临时的容器。
        //它是独立的，而不是任何其他文档的一部分。
        //它的parentNode总是为null，可以有任意多的子节点。

        var f = document.createDocumentFragment();

        //var f = document.createElement("div");
        //从后至前循环子节点，将每一个子节点移动到文档片段中
        //n的最后一个节点变成f的第一个节点，反之亦然
        //注意，给f添加一个节点，该节点自动地会从n中删除

        while (n.lastChild) {
            f.appendChild(n.lastChild);
            console.log(f.childNodes);
        }
        //最后，把f的所有子节点一次性全部移回n中
        n.appendChild(f);
    }

    var ul = document.getElementById('ul');
    reverseChildNodes(ul);

###### 还看到一种CSS3的方法：
    ul {transform: rotate(180deg)};
    li {transform: rotate(180deg)};