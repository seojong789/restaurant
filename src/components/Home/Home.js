import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './Home.scss'
import { useNavigate } from 'react-router-dom';

function ProjectList({ projects }) {
    function createProjectListItem(project) {
        const byline = project.acf.project_byline;
        const client = project.acf.project_client;

        return (
            <li key={'project-' + project.id}>
                <a to={'/projects/' + project.slug}>
                    <h3 className="projectlist--client">{client}</h3>
                    <h4 className="projectlist--byline">{byline}</h4>
                </a>
            </li>
        );
    }

    return (
        <div className="project-list">
            <ul className="menu vertical">
                {projects.map(createProjectListItem)}
            </ul>
        </div>
    );
}

function ProjectCategory({ cat, handleClick, active, focusOff, focused, shiftLeft, Index, isLast }) {
    function getWidth(isActive) {
        const w = !isActive ? 'calc(20vw - 20px)' : '500px';
        return w;
    }

    const styles = {
        container: {
            transform: active ? 'scale(1.1) translate3d(0, 0, 0)' : 'scale(1) translate3d(0, 0, 0)',
        },
        item: {
            transform: () => {
                const direction = shiftLeft ? '-' : '';
                const transform = focused && !active ? `translate3d(${direction}100%, 0, 0)` : 'translate3d(0, 0, 0)';
                return transform;
            },
        },
        background: {
            background: `url(${cat.thumbnail}) no-repeat center center`,
            backgroundSize: 'cover',
            height: '500px',
            width: getWidth(active),
        },
    };

    const classes = classNames({ category: true, isActive: active, isLast, shiftLeft });
    const navigate = useNavigate();
    const handleCategoryClick = () => {
        navigate('/reserve', {state: { category: cat.name }});
        // console.log(cat.name);
    }

    return (
        <li className={classes} style={styles.item}>
            <div className="category--content">
                <h2>{cat.name}</h2>
                <ProjectList projects={cat.projects} />
            </div>
            <div className="category--image-container" onClick={() => handleClick(Index)} style={styles.container}>
                <div className="category--image" style={styles.background}></div>
            </div>
            <div className="category--name">
                <h6>{cat.name}</h6>
            </div>
            <div className="category--closeButton">
                <a href="#">Back</a>
                <button style={{fontSize:'15px', padding:'1%', marginLeft:'2%'}} onClick={handleCategoryClick}>추천받기!</button>
            </div>
        </li>
    );
}

function Collection() {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // 데이터 가져오는 로직 (fetch 또는 서버에서 데이터 가져오는 코드)
        setCategories([
            {
                thumbnail: "/images/western.jpg",
                link: "http://seanma.de",
                taxonomy: "category",
                category: 'western',
                name: "양식",
                slug: "commodo",
                id: "586537da62981d5fb8c21617",
                projects: [
                    // 프로젝트 데이터
                ],
            },
            {
                thumbnail: "/images/chinese.jpg",
                link: "http://seanma.de",
                taxonomy: "category",
                category: 'chinese',
                name: "중식",
                slug: "laborum",
                id: "586537da60c040bc1e3060a1",
                projects: [
                    // 프로젝트 데이터
                ],
            },
            {
                thumbnail: "/images/korean.jpg",
                link: "http://seanma.de",
                taxonomy: "category",
                category: 'korean',
                name: "한식",
                slug: "commodo",
                id: "586537daffc67c66ec4dc356",
                projects: [
                    // 프로젝트 데이터
                ],
            },
            {
                thumbnail: "images/japanese.jpg",
                link: "http://seanma.de",
                taxonomy: "category",
                category: 'japanese',
                name: "일식",
                slug: "voluptate",
                id: "586537dae1be34396786ce5f",
                projects: [
                    // 프로젝트 데이터
                ],
            },
            {
                thumbnail: "/images/desert.jpg",
                link: "http://seanma.de",
                taxonomy: "category",
                category: 'desert',
                name: "디저트",
                slug: "voluptate",
                id: "586537dab274a22da2f3edae",
                projects: [
                    // 프로젝트 데이터
                ],
            },
        ]);
    }, []);

    const handleClick = (i) => {
        setActiveIndex(i);
        setOpen(true);
    };

    const focusOff = (e) => {
        e.preventDefault();
        if (e.target.className !== 'category--image') {
            setActiveIndex(null);
            setOpen(false);
        }
    };

    const categoryNode = (cat, i) => {
        const isLast = i === categories.length - 1 || i === categories.length - 2;
        const shiftLeft = i < activeIndex;

        return (
            <ProjectCategory
                cat={cat}
                key={'cat-' + i}
                handleClick={handleClick}
                active={i === activeIndex}
                focusOff={focusOff}
                focused={open}
                shiftLeft={shiftLeft}
                Index={i}
                isLast={isLast}
            />
        );
    };

    const classes = classNames({
        focused: open,
    });

    const catNodes = categories.map(categoryNode);

    return (
        <div className={'categories--menu-container ' + classes} onClick={focusOff} style={{ height: window.innerHeight }}>
            <ul className="categories menu">{catNodes}</ul>
        </div>
    );
}

function Home() {
    return (
        <div className="HomeContainer">
            <Collection />
        </div>
    );
}

export default Home;
