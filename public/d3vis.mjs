import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

fetch('/network/data')
    .then(response => response.json())
    .then(data => {

        const directUsers = data.directUsers;

        const nodes = [
            { id: 'You', group: 'central_user' },
            ...directUsers.map(user => ({
                id: user.user.netid,
                group: 'direct_connected_user',
                user: user.user,
                count: user.count
            }))
        ];

        const links = directUsers.map(user => ({
            source: 'You',
            target: user.user.netid
        }));

        const width = 600;
        const height = 600;

        const svg = d3.select('#network')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-200)) // TODO spread out nodes here
            .force('link', d3.forceLink(links).id(d => d.id).distance(100)) // TODO adjust link distance
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('stroke', '#4A90E2')
            .attr('stroke-width', 2);

        const node = svg.selectAll('.node')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', d => d.group === 'central_user' ? 40 : 35)
            .attr('fill', d => d.group === 'central_user' ? 'rgb(79 70 229 / var(--tw-bg-opacity))' : '#7F8C8D')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .each(function (d, i) {
                d.index = i;
                d3.select(this).attr('data-user-netid', nodes[i].id);
            });

        const label = svg.selectAll('.label')
            .data(nodes)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', 12) // TODO adjust size based on node radius?
            .attr('fill', '#fff')
            .text(d => d.user ? d.user.firstName + ' x' + d.count : d.id)
            .each(function (d, i) {
                d.index = i;
                d3.select(this).attr('data-user-netid', nodes[i].id);
            });

        node.on('click', (evt) => {
            let netid = evt.target.getAttribute('data-user-netid');
            if (netid == 'You') {
                netid = ''
            }
            window.location.href = `/users/${netid}`
        })

        label.on('click', (evt) => {
            let netid = evt.target.getAttribute('data-user-netid');
            if (netid == 'You') {
                netid = ''
            }
            window.location.href = `/users/${netid}`
        })
        node.on('mouseover', (evt) => {
            evt.target.style.cursor = 'pointer';
        })
        label.on('mouseover', (evt) => {
            evt.target.style.cursor = 'pointer';
        })

        // some simulation stuff
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            label
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
    });
