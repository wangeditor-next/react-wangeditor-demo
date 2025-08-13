/**
 * @description React wangEditor usage
 * @author wangfupeng
 */

import React, { useState, useEffect } from 'react';
import '@wangeditor-next/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react';
import { Boot, IDomEditor } from '@wangeditor-next/editor';
import FloatImageModule from '@wangeditor-next/plugin-float-image';
import markdownModule from '@wangeditor-next/plugin-markdown';

Boot.registerModule(markdownModule);
Boot.registerModule(FloatImageModule);

const MyEditor: React.FC = () => {
    const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
    const [html, setHtml] = useState<string>('<p>hello</p>');

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        const timer = setTimeout(() => {
            setHtml(
                '<p>hello <strong>world</strong>.</p><p>asdasd1asdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd<img src="asd" alt="asd" data-href="asd" style="float: right;"/></p>',
            );
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const toolbarConfig = {};
    const editorConfig = {
        hoverbarKeys: {
            // 在编辑器中，选中链接文本时，要弹出的菜单
            image: {
                menuKeys: [
                    // 默认的配置可以通过 `editor.getConfig().hoverbarKeys.image` 获取
                    'imageFloatNone', // 增加 '图片浮动' 菜单
                    'imageFloatLeft',
                    'imageFloatRight',
                    '|', // 分割符
                    'editImage',
                    'viewImageLink',
                    'deleteImage',
                ],
            },
        },

        // 其他配置...
    };

    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);

    const insertText = (): void => {
        if (editor == null) return;
        editor.insertText(' hello ');
    };

    const printHtml = (): void => {
        if (editor == null) return;
        console.log(editor.getHtml());
        console.log(editor.getConfig());
    };

    return (
        <>
            <div>
                <button onClick={insertText}>insert text</button>
                <button onClick={printHtml}>print html</button>
            </div>

            <div
                style={{
                    border: '1px solid #ccc',
                    zIndex: 100,
                    marginTop: '15px',
                }}
            >
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor: IDomEditor) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>{html}</div>
        </>
    );
};

export default MyEditor;
