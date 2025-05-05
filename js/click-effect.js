function clickEffect() {
    let rings = [];
    let stars = [];
    let diamonds = [];
    let centers = [];
    
    // 创建canvas元素
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const ctx = canvas.getContext("2d");
    
    // 更新canvas尺寸
    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
    }
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // 中心光点类
    class Center {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 15;
            this.alpha = 1;
            this.decay = 0.05;
            this.color = 'rgba(255, 230, 150, 1)';
        }
        
        update() {
            this.alpha -= this.decay;
            this.size *= 0.95;
            return this.alpha > 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            
            // 添加发光效果
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 2
            );
            gradient.addColorStop(0, 'rgba(255, 230, 150, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 230, 150, 0)');
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 环形类
    class Ring {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 1;
            this.maxRadius = 60;
            this.lineWidth = 3;
            this.speed = 6;
            this.alpha = 1;
            this.color = 'rgba(255, 220, 150, 0.8)';
        }
        
        update() {
            this.radius += this.speed;
            this.alpha = 1 - (this.radius / this.maxRadius);
            this.lineWidth = 3 * (1 - this.radius / this.maxRadius);
            return this.alpha > 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.globalAlpha = this.alpha;
            ctx.stroke();
        }
    }
    
    // 菱形类
    class Diamond {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 1;
            this.maxSize = 100;
            this.lineWidth = 2;
            this.speed = 5;
            this.alpha = 1;
            this.rotation = Math.random() * Math.PI;
            this.color = 'rgba(255, 230, 150, 0.6)';
        }
        
        update() {
            this.size += this.speed;
            this.alpha = 1 - (this.size / this.maxSize);
            this.lineWidth = 2 * (1 - this.size / this.maxSize);
            this.rotation += 0.02;
            return this.alpha > 0;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size, 0);
            ctx.lineTo(0, this.size);
            ctx.lineTo(-this.size, 0);
            ctx.closePath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.globalAlpha = this.alpha;
            ctx.stroke();
            ctx.restore();
        }
    }
    
    // 星星类
    class Star {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 6 + 3;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = 0.015;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.2;
            this.color = `hsl(${Math.random() * 30 + 45}, 100%, ${Math.random() * 20 + 70}%)`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.alpha -= this.decay;
            this.rotation += this.rotationSpeed;
            this.size *= 0.99;
            return this.alpha > 0;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            
            // 绘制六角星
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(0, this.size);
                ctx.lineTo(this.size * 0.4, this.size * 0.4);
                ctx.rotate(Math.PI / 3);
            }
            
            ctx.closePath();
            ctx.fill();
            
            // 添加内发光效果
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
            gradient.addColorStop(0, 'rgba(255, 255, 200, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // 点击事件处理
    window.addEventListener('click', function(e) {
        // 创建中心光点
        centers.push(new Center(e.clientX, e.clientY));
        
        // 创建环形
        for (let i = 0; i < 2; i++) {
            rings.push(new Ring(e.clientX, e.clientY));
        }
        
        // 创建菱形
        for (let i = 0; i < 2; i++) {
            diamonds.push(new Diamond(e.clientX, e.clientY));
        }
        
        // 创建星星
        for (let i = 0; i < 10; i++) {
            stars.push(new Star(e.clientX, e.clientY));
        }
    });
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 更新和绘制中心光点
        centers = centers.filter(center => {
            center.draw();
            return center.update();
        });
        
        // 更新和绘制环形
        rings = rings.filter(ring => {
            ring.draw();
            return ring.update();
        });
        
        // 更新和绘制菱形
        diamonds = diamonds.filter(diamond => {
            diamond.draw();
            return diamond.update();
        });
        
        // 更新和绘制星星
        stars = stars.filter(star => {
            star.draw();
            return star.update();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 当文档加载完成后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', clickEffect);
} else {
    clickEffect();
} 