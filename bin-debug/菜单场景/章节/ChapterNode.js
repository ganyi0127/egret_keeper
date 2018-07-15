var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ChapterNode = (function (_super) {
    __extends(ChapterNode, _super);
    /**
     * init
     */
    function ChapterNode(match) {
        var _this = _super.call(this) || this;
        _this.match = match;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ChapterNode.prototype.onAddToStage = function (event) {
        var _this = this;
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = _this.onUpdate;
        });
        this.config();
        this.createContents();
    };
    ChapterNode.prototype.config = function () {
        this.bgWidth = this.stage.stageWidth * 0.8;
        this.bgHeight = this.stage.stageHeight * 0.8;
        this.bgX = (this.stage.stageWidth - this.bgWidth) - 32;
        this.bgY = (this.stage.stageHeight - this.bgHeight) / 2;
        this.finalTotalWidth = this.bgWidth * 0.9;
        this.finalTotalHeight = this.bgHeight - 200;
        this.finalCenterX = this.bgX + this.bgWidth / 2;
        this.finalCenterY = this.bgY + this.bgHeight - this.finalTotalHeight / 2 - 50;
        this.finalInterval = (this.finalTotalWidth - 180) / 8;
    };
    ChapterNode.prototype.createContents = function () {
        //添加背景
        var bg = new egret.Shape();
        bg.graphics.lineStyle(16, 0xffffff, 0.5, false, egret.StageScaleMode.EXACT_FIT, egret.CapsStyle.NONE, egret.JointStyle.BEVEL, 0, [32, 32]);
        bg.graphics.beginFill(0x6e6e8e, 1);
        bg.graphics.drawRoundRect(this.bgX, this.bgY, this.bgWidth, this.bgHeight, 128, 256);
        bg.graphics.endFill();
        this.addChild(bg);
        this.bg = bg;
        //显示赛事title
        var titleLabel = new egret.BitmapText();
        titleLabel.font = RES.getRes("font_fnt");
        titleLabel.textAlign = egret.HorizontalAlign.LEFT;
        titleLabel.text = this.match.year;
        var titleLabelScale = 0.8;
        titleLabel.x = this.bgX + 32;
        titleLabel.y = this.bgY + 32;
        titleLabel.scaleX = titleLabel.scaleY = titleLabelScale;
        this.addChild(titleLabel);
        //显示赛事subTitle
        var subTitleLabel = new egret.BitmapText();
        subTitleLabel.font = RES.getRes("font_fnt");
        subTitleLabel.textAlign = egret.HorizontalAlign.LEFT;
        subTitleLabel.verticalAlign = egret.VerticalAlign.BOTTOM;
        subTitleLabel.text = this.match.name;
        var subTitleLabelScale = 0.5;
        subTitleLabel.x = titleLabel.x + titleLabel.width + 32;
        subTitleLabel.y = this.bgY + 32;
        subTitleLabel.scaleX = subTitleLabel.scaleY = subTitleLabelScale;
        this.addChild(subTitleLabel);
        //添加赛事
        this.addMatchs();
    };
    /**
     * 添加赛事
     */
    ChapterNode.prototype.addMatchs = function () {
        var _this = this;
        //获取章节进度
        var process = Config.getProcessOfChapter(this.match.id);
        //获取中国对
        var chinaTeam = DataInstance.getInstance().chinaTeam;
        var _loop_1 = function (key) {
            if (this_1.match.groups.hasOwnProperty(key)) {
                var teams = this_1.match.groups[key];
                //获取每组中心点
                var regularFinalPosition_1 = this_1.getRegularFinalPosition(key);
                //判断左右
                var isLeftDirection = this_1.getDirection(key);
                //添加组名 A~H 
                var groupLabel = new egret.BitmapText();
                groupLabel.font = RES.getRes("font_fnt");
                groupLabel.textAlign = egret.HorizontalAlign.CENTER;
                groupLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
                groupLabel.text = key;
                var groupLabelScale = 0.5;
                var groupLabelWidth = 200;
                var groupLabelHeight = 100;
                groupLabel.x = regularFinalPosition_1.x + (isLeftDirection ? -120 : 120) - groupLabelWidth / 2 * groupLabelScale;
                groupLabel.y = regularFinalPosition_1.y - groupLabelHeight / 2 * groupLabelScale;
                groupLabel.width = groupLabelWidth;
                groupLabel.height = groupLabelHeight;
                groupLabel.scaleX = groupLabel.scaleY = groupLabelScale;
                this_1.addChild(groupLabel);
                //遍历每组球队
                var teamCubeWidth_1;
                var teamCubeInterval = 8;
                teams.every(function (teamCode, index, array) {
                    var teamCube = new TeamCube(Config.Final.RegularFinal);
                    var team = DataInstance.getInstance().teamMap[teamCode];
                    teamCube.setTeam(team);
                    teamCube.targetTeam = team;
                    //设置状态
                    teamCube.hasWon = false;
                    if (process) {
                        if (process.final == Config.Final.RegularFinal) {
                            //在小组赛内                            
                            var totalIndex = index + (key.charCodeAt(0) - "A".charCodeAt(0)) * 4;
                            var lowerIndex = process.index - (process.index % 4);
                            var upperIndex = lowerIndex + 4;
                            if ((totalIndex >= lowerIndex) && (totalIndex < upperIndex)) {
                                //小组赛(同组)
                                if (process.index % 4 == index) {
                                    //可进入比赛
                                    teamCube.canOppose = true;
                                }
                                else {
                                    //不可进入比赛
                                    teamCube.canOppose = false;
                                    //判断是否已比赛
                                    if (process.index % 4 > index) {
                                    }
                                    else {
                                        teamCube.hasWon = true;
                                    }
                                }
                            }
                            else {
                                //小组赛(不同组)
                                teamCube.canOppose = false;
                            }
                        }
                        else {
                            //小组赛已过
                            teamCube.canOppose = false;
                        }
                    }
                    else {
                        //从小组赛第一位开始比赛
                        if (index == 0) {
                            teamCube.canOppose = true;
                        }
                        else {
                            teamCube.canOppose = false;
                        }
                    }
                    //记录teamCube高度
                    if (!teamCubeWidth_1) {
                        teamCubeWidth_1 = teamCube.widthLength;
                    }
                    var deltaPoint = _this.getRegularFinalOffset(index);
                    deltaPoint.x += regularFinalPosition_1.x;
                    deltaPoint.y += regularFinalPosition_1.y;
                    teamCube.x = deltaPoint.x;
                    teamCube.y = deltaPoint.y;
                    _this.addChild(teamCube);
                    return true;
                });
            }
        };
        var this_1 = this;
        //创建小组赛比赛位
        for (var key in this.match.groups) {
            _loop_1(key);
        }
        //创建八分之一赛       
        var halfQuarterfinalMap = [0, 1, 2, 3, 4, 5, 6, 7];
        for (var _i = 0, halfQuarterfinalMap_1 = halfQuarterfinalMap; _i < halfQuarterfinalMap_1.length; _i++) {
            var index = halfQuarterfinalMap_1[_i];
            var position_1 = this.getHalfQuarterfinalPosition(index);
            var teamCube_1 = new TeamCube(Config.Final.HalfQuarterfinal);
            var team_1 = Config.getFinalTeam(this.match.id, Config.Final.HalfQuarterfinal, index);
            teamCube_1.setTeam(team_1);
            //设置状态(八分之一决赛不需要进行比赛)
            teamCube_1.canOppose = false;
            teamCube_1.hasWon = true;
            if (process) {
                if (process.final == Config.Final.HalfQuarterfinal) {
                    //在八分之一决赛内                                                                                        
                    teamCube_1.hasWon = false;
                }
            }
            teamCube_1.x = position_1.x;
            teamCube_1.y = position_1.y;
            this.addChild(teamCube_1);
        }
        //创建四分之一赛
        var quarterfinalMap = [0, 1, 2, 3];
        for (var _a = 0, quarterfinalMap_1 = quarterfinalMap; _a < quarterfinalMap_1.length; _a++) {
            var index = quarterfinalMap_1[_a];
            var position_2 = this.getQuarterfinalPosition(index);
            var teamCube_2 = new TeamCube(Config.Final.Quarterfinal);
            var team_2 = Config.getFinalTeam(this.match.id, Config.Final.Quarterfinal, index);
            teamCube_2.setTeam(team_2);
            //设置状态
            teamCube_2.hasWon = true;
            teamCube_2.canOppose = false;
            if (process) {
                if (process.final == Config.Final.Quarterfinal) {
                    //在四分之一决赛内                            
                    teamCube_2.hasWon = false;
                    teamCube_2.canOppose = true;
                    //读取目标队伍
                    if (process.index == index) {
                        var targetTeam0 = Config.getFinalTeam(this.match.id, Config.Final.HalfQuarterfinal, index * 2);
                        var targetTeam1 = Config.getFinalTeam(this.match.id, Config.Final.HalfQuarterfinal, index * 2 + 1);
                        if (targetTeam0.name == chinaTeam.name) {
                            teamCube_2.targetTeam = targetTeam0;
                        }
                        else {
                            teamCube_2.targetTeam = targetTeam1;
                        }
                    }
                }
            }
            teamCube_2.x = position_2.x;
            teamCube_2.y = position_2.y;
            this.addChild(teamCube_2);
        }
        //创建半决赛
        var semifinalsMap = [0, 1];
        for (var _b = 0, semifinalsMap_1 = semifinalsMap; _b < semifinalsMap_1.length; _b++) {
            var index = semifinalsMap_1[_b];
            var position_3 = this.getSemifinalsPosition(index);
            var teamCube_3 = new TeamCube(Config.Final.Semifinals);
            var team_3 = Config.getFinalTeam(this.match.id, Config.Final.Semifinals, index);
            teamCube_3.setTeam(team_3);
            //设置状态
            teamCube_3.hasWon = true;
            teamCube_3.canOppose = false;
            if (process) {
                if (process.final == Config.Final.Semifinals) {
                    //在半决赛内                            
                    teamCube_3.hasWon = false;
                    teamCube_3.canOppose = true;
                    //读取目标队伍
                    if (process.index == index) {
                        var targetTeam0 = Config.getFinalTeam(this.match.id, Config.Final.Quarterfinal, index * 2);
                        var targetTeam1 = Config.getFinalTeam(this.match.id, Config.Final.Quarterfinal, index * 2 + 1);
                        if (targetTeam0.name == chinaTeam.name) {
                            teamCube_3.targetTeam = targetTeam0;
                        }
                        else {
                            teamCube_3.targetTeam = targetTeam1;
                        }
                    }
                }
            }
            teamCube_3.x = position_3.x;
            teamCube_3.y = position_3.y;
            this.addChild(teamCube_3);
        }
        //创建决赛
        var position = this.getFinalsPosition();
        var teamCube = new TeamCube(Config.Final.Finals);
        var team = Config.getFinalTeam(this.match.id, Config.Final.Finals, 0);
        teamCube.setTeam(team);
        //设置状态
        teamCube.hasWon = true;
        teamCube.canOppose = false;
        if (process) {
            if (process.final == Config.Final.Finals) {
                //在决赛内                            
                teamCube.hasWon = false;
                teamCube.canOppose = true;
                //读取目标队伍                
                var targetTeam0 = Config.getFinalTeam(this.match.id, Config.Final.Semifinals, 0);
                var targetTeam1 = Config.getFinalTeam(this.match.id, Config.Final.Semifinals, 1);
                if (targetTeam0.name == chinaTeam.name) {
                    teamCube.targetTeam = targetTeam0;
                }
                else {
                    teamCube.targetTeam = targetTeam1;
                }
            }
            else if (process.final == Config.Final.Champion) {
                //已赢得世界杯
                teamCube.isChampion = true;
            }
        }
        teamCube.x = position.x;
        teamCube.y = position.y;
        this.addChild(teamCube);
    };
    /**
     * 获取决赛位置
     */
    ChapterNode.prototype.getFinalsPosition = function () {
        var point = new egret.Point();
        point.x = this.finalCenterX;
        point.y = this.finalCenterY - 300;
        return point;
    };
    /**
     * 获取半决赛位置
     * @param index 序列
     */
    ChapterNode.prototype.getSemifinalsPosition = function (index) {
        var point = new egret.Point();
        point.x = this.finalCenterX + (index == 0 ? -this.finalInterval : this.finalInterval);
        point.y = this.finalCenterY;
        return point;
    };
    /**
     * 获取四分之一决赛
     * @param index 序列
     */
    ChapterNode.prototype.getQuarterfinalPosition = function (index) {
        var point = new egret.Point();
        point.x = this.finalCenterX + (index < 2 ? -this.finalInterval : this.finalInterval) * 2;
        point.y = this.finalCenterY + (index % 2 == 0 ? -this.finalTotalHeight : this.finalTotalHeight) / 4;
        return point;
    };
    /**
     * 获取八分之一决赛
     * @param index 序列
     */
    ChapterNode.prototype.getHalfQuarterfinalPosition = function (index) {
        var point = new egret.Point();
        point.x = this.finalCenterX + (index < 4 ? -this.finalInterval : this.finalInterval) * 3;
        point.y = this.finalCenterY - this.finalTotalHeight / 2 + this.finalTotalHeight / 8 + (this.finalTotalHeight / 4) * (index % 4);
        return point;
    };
    /**
     * 获取小组赛比赛位中心位置
     * @param key 组别
     */
    ChapterNode.prototype.getRegularFinalPosition = function (key) {
        var isLeftDirection = this.getDirection(key);
        var ascii = key.charCodeAt(0);
        var asciiA = "A".charCodeAt(0);
        var asciiE = "E".charCodeAt(0);
        var firstAscii = isLeftDirection ? asciiA : asciiE;
        var delta = ascii - firstAscii;
        var centerPosition = new egret.Point();
        centerPosition.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 4;
        centerPosition.y = this.finalCenterY - this.finalTotalHeight / 2 + (this.finalTotalHeight / 4) / 2 + (this.finalTotalHeight / 4) * delta;
        return centerPosition;
    };
    /**
     * 获取小组赛偏移
     * @param index 偏移
     */
    ChapterNode.prototype.getRegularFinalOffset = function (index) {
        var delta = (this.finalTotalHeight / 8) / 2;
        var point = new egret.Point();
        point.x = index == 0 || index == 2 ? -delta : delta;
        point.y = index == 0 || index == 1 ? -delta : delta;
        return point;
    };
    /**
     * 判断比赛位左右
     * @param key 组别
     */
    ChapterNode.prototype.getDirection = function (key) {
        var ascii = key.charCodeAt(0);
        var asciiA = "A".charCodeAt(0);
        return ascii - asciiA < 4;
    };
    /**
     * 更新
     */
    ChapterNode.prototype.onUpdate = function () {
    };
    return ChapterNode;
}(egret.DisplayObjectContainer));
__reflect(ChapterNode.prototype, "ChapterNode");
//# sourceMappingURL=ChapterNode.js.map