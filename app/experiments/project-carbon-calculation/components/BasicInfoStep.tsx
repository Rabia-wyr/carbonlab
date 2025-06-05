          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName"><strong>项目名称</strong>：</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                placeholder="请输入项目名称"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription"><strong>项目描述</strong>：</Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => onProjectDescriptionChange(e.target.value)}
                placeholder="请输入项目描述"
                className="min-h-[100px]"
              />
            </div>
          </div> 